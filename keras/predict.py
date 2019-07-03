from keras import backend as bknd
from keras.callbacks import *
from keras.layers import *
from keras.models import *
from keras.optimizers import SGD
from keras.utils import *
import numpy as np
from keras.callbacks import ModelCheckpoint 
from keras.callbacks import TensorBoard
from keras import optimizers

from STN.spatial_transformer import SpatialTransformer
#import CRNN_with_STN
from Batch_Generator import img_gen, img_gen_val

from config import learning_rate, load_model_path, width, height, characters, label_len, label_classes, \
    cp_save_path, base_model_path,file_list_val,lexicon_dic_path,img_folder

import cv2
import linecache
from PIL import Image 


file_list_val =open('./max/annotation_val.txt','r');
file_list_val_full = file_list_val.readlines()
#print(file_list_val_full)
file_list_val_len = len(file_list_val_full)
#print(file_list_val_len)    

'''
def loc_net(input_shape):
    b = np.zeros((2, 3), dtype='float32')
    b[0, 0] = 1
    b[1, 1] = 1
    w = np.zeros((64, 6), dtype='float32')
    weights = [w, b.flatten()]

    loc_input = Input(input_shape)

    loc_conv_1 = Conv2D(16, (5, 5), padding='same', activation='relu')(loc_input)
    loc_conv_2 = Conv2D(32, (5, 5), padding='same', activation='relu')(loc_conv_1)
    loc_fla = Flatten()(loc_conv_2)
    loc_fc_1 = Dense(64, activation='relu')(loc_fla)
    loc_fc_2 = Dense(6, weights=weights)(loc_fc_1)

    output = Model(inputs=loc_input, outputs=loc_fc_2)

    return output
'''

def evaluate(input_model):
    correct_prediction = 0
    ap = cv2.imread('./ravi.jpg')
    si  = ap.shape

    bat  =(si[0]*si[1]*si[2])//(200*31*3)
    generator = img_gen_val(input_model,bat+200)

    x_test, y_test = next(generator)
    # print(" ")
    '''y_pred = input_model.predict(x_test) 
    shape = y_pred[:, 2:, :].shape 
    ctc_decode = bknd.ctc_decode(y_pred[:, 2:, :], input_length=np.ones(shape[0])*shape[1])[0][0]
    out = bknd.get_value(ctc_decode)[:, :label_len]

    for m in range(1):
        result_str = ''.join([characters[k] for k in out[m]])
        result_str = result_str.replace('-', '')
        print(result_str)
        #if result_str == y_test[m]:
         #   correct_prediction += 1
            # print(m)
        #else:
         #   print(result_str, y_test[m])
          #  print(result_str)

    #return correct_prediction*1.0/10
    '''

def makeImage():
    
    out_img = np.zeros((1, width, height, 3), dtype=np.uint8)

    pick_index = np.random.randint(0, file_list_val_len-1)
    file_list_full_split = [m for m in file_list_val_full[pick_index].split()]
    lexicon = linecache.getline(lexicon_dic_path, int(file_list_full_split[1]) + 1).strip("\n")
    
    img_path = img_folder + file_list_full_split[0][1:]
    img = cv2.imread(img_path)
    img_size =img.shape
    print(img_size)
    
    if (img_size[1]/(img_size[0]*1.0)) < 6.4:
        img_reshape = cv2.resize(img, (int(31.0/img_size[0]*img_size[1]), height))
        mat_ori = np.zeros((height, width - int(31.0/img_size[0]*img_size[1]), 3), dtype=np.uint8)
        out_img = np.concatenate([img_reshape, mat_ori], axis=1).transpose([1, 0, 2])
    else:
        out_img = cv2.resize(img, (width, height), interpolation=cv2.INTER_CUBIC)
        
        
        out_img = np.asarray(out_img).transpose([1, 0, 2])
    
    
    return out_img ,lexicon



def img_gen_val(input_model,batch_size):
    x = np.zeros((batch_size, width, height, 3), dtype=np.uint8)
    # y = np.zeros((batch_size, label_len), dtype=np.uint8)
    y = []

   
    #pick_index = np.random.randint(0, file_list_val_len - 1)
    
    #file_list_full_split = [m for m in file_list_val_full[pick_index].split()]
    #lexicon = linecache.getline(lexicon_dic_path, int(file_list_full_split[1]) + 1).strip("\n")
    #img_path = img_folder + file_list_full_split[0][1:]
   
    
    # abandon the lexicon which is longer than 16 characters, because I set the label_len = 16, you can change it anyway.
    # some dataset images may be damaged during unzip
    #if (img is not None) and len(lexicon) <= label_len:
    #    img_size = img.shape  # (height, width, channels)
    #    if img_size[1] > 2 and img_size[0] > 2:
    #        break
    ans=""
    im = Image.open('./ravi.jpg')
    ip=-1
    imgwidth, imgheight = im.size
    for i in range(0,imgheight,height):
        for j in range(0,imgwidth,width):
            box = (j, i, j+width, i+height)
            a = im.crop(box)
            
            img= cv2.cvtColor(np.array(a), cv2.COLOR_RGB2BGR)
            
            
            
            
            img_size = img.shape
            ip+=1
            if (img_size[1]/(img_size[0]*1.0)) < 6.4:
                img_reshape = cv2.resize(img, (int(31.0/img_size[0]*img_size[1]), height))
                mat_ori = np.zeros((height, width - int(31.0/img_size[0]*img_size[1]), 3), dtype=np.uint8)
                out_img = np.concatenate([img_reshape, mat_ori], axis=1).transpose([1, 0, 2])
            else:
                out_img = cv2.resize(img, (width, height), interpolation=cv2.INTER_CUBIC)
                out_img = np.asarray(out_img).transpose([1, 0, 2])
            
            out_img = out_img.reshape(1,200,31,3)
            y_pred = input_model.predict(out_img) 
            shape = y_pred[:, 2:, :].shape 
            ctc_decode = bknd.ctc_decode(y_pred[:, 2:, :], input_length=np.ones(shape[0])*shape[1])[0][0]
            out = bknd.get_value(ctc_decode)[:, :label_len]
        
            for m in range(1):
                result_str = ''.join([characters[k] for k in out[m]])
                result_str = result_str.replace('-', '')
                ans += result_str
                print(result_str)
            x[ip]=out_img
            y.append('s')
    
    print(x)
    print(ans)
    print(ip)
    #y.append(lexicon)
    
    yield x, y



#print(img_gen_val(1))
    


            
            
           
#crop(200,31)



#print(model.summary())

#model.compile(loss={'ctc': lambda y_true, y_pred: y_pred}, optimizer=sgd)
model = load_model(base_model_path)

print("hello")
evaluate(model)



#img = cv2.imread('./ravi.jpg',cv2.IMREAD_GRAYSCALE)

#cv2.imshow('p',img);
#
    






