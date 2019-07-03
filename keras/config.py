import string

width = 200
height = 31
label_len = 16

characters = '0123456789'+string.ascii_lowercase+'-'
label_classes = len(characters)+1

lexicon_dic_path = './max/lexicon.txt'
file_list = open('./max/annotation_train.txt', 'r')
file_list_val = open('./max/annotation_val.txt', 'r')
img_folder = './max/'


learning_rate = 0.002  # learning rate, 0.002 for default
cp_save_path = './models/weights_best_STN.{epoch:02d}-{loss:.2f}.hdf5' \
    # save checkpoint
base_model_path = './models/weights_for_predict_STN.hdf5'  \
    # the model for predicting
tb_log_dir = './CRC_n/paper_log'  # TensorBoard save path, Optional
load_model_path = ''  \
    # if you want to train a new model, please set  load_model_path = ""

