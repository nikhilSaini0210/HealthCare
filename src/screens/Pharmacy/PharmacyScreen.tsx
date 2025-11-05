import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import CustomSafeAreaView from '../../components/global/CustomSafeAreaView';
import { pharmacies } from '../../utils/helper';
import PharmacyCard from '../../components/Pharmacy/PharmacyCard';
import UploadOption from '../../components/Pharmacy/UploadOption';
import { colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import LocationIcon from '../../assets/icons/LocationIcon';
import {
  uploadFromUrl,
  uploadToCloudinary,
} from '../../service/upload.service';
import {
  pickDocument,
  pickImages,
  takePhoto,
} from '../../service/mediaPicker.service';
import ImagePickerModal from '../../components/modal/ImagePickerModal';
import CustomButton from '../../components/global/CustomButton';
import mime from 'mime';
import { showAlert } from '../../utils/AlertUtil';
import LinkInputModal from '../../components/modal/LinkInputModal';
import Icon from '../../components/global/Icon';
import TouchableText from '../../components/global/TouchableText';
import mockPrescriptions from '../../utils/data';
import PrescriptionDB from '../../service/prescription.service';

const PharmacyScreen: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [linkSeleted, setLinkSelected] = useState('');
  const [showLink, setShowLink] = useState<boolean>(false);
  const [linkLoading, setLinkLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const hanleSelectImage = async () => {
    setShowModal(false);
    const uris = await pickImages(1);

    if (uris.length > 0) {
      setSelectedImage(uris[0]);
    }
  };

  const handleTakePhoto = async () => {
    setShowModal(false);
    const uris = await takePhoto();
    if (uris.length > 0) {
      setSelectedImage(uris[0]);
    }
  };

  const handlePickDocument = async () => {
    setShowModal(false);
    const uri = await pickDocument();
    if (uri) {
      setSelectedDoc(uri);
    }
  };

  const updateRandomPrescription = async (res: {
    url: string;
    format: string;
  }) => {
    const randomIndex = Math.floor(Math.random() * mockPrescriptions.length);

    const updatedPrescription = { ...mockPrescriptions[randomIndex] };

    updatedPrescription.fileUri = res.url;
    updatedPrescription.thumbnailUri = res.url;
    updatedPrescription.type = res.format === 'pdf' ? 'pdf' : 'image';

    mockPrescriptions[randomIndex] = updatedPrescription;

    await PrescriptionDB.save(updatedPrescription);
  };

  const onUploadFile = async () => {
    const fileUri = selectedImage || selectedDoc;

    if (!fileUri) {
      showAlert({
        title: 'Error',
        message: 'Please select or capture an image or document.',
      });
      return;
    }
    setLoading(true);
    const mimeType =
      mime.getType(fileUri) ||
      (selectedImage ? 'image/jpeg' : 'application/pdf');
    const fileName =
      fileUri.split('/').pop() ||
      `prescriptions_${Date.now()}.${selectedImage ? 'jpg' : 'pdf'}`;

    try {
      const res = await uploadToCloudinary({
        fileUri,
        fileName,
        mimeType,
      });
      if (res) {
        if (selectedImage) {
          const updatedData = {
            url: res.url,
            format: 'image',
          };
          await updateRandomPrescription(updatedData);
          setSelectedImage('');
        } else {
          const updatedData = {
            url: res.url,
            format: 'pdf',
          };
          await updateRandomPrescription(updatedData);
          setSelectedDoc('');
        }
        showAlert({
          title: 'Success',
          message: `${
            selectedImage ? 'Image' : 'Document'
          } uploaded successfully.`,
        });
      } else {
        showAlert({
          title: 'Error',
          message: `Unable to upload ${selectedImage ? 'image' : 'document'}.`,
        });
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        'Something went wrong. Please check your internet connection.';
      showAlert({ title: 'Error', message: errMsg });
    } finally {
      setLoading(false);
    }
  };

  const pickLink = async () => {
    if (!linkSeleted.trim()) {
      return;
    }
    setLinkLoading(true);
    try {
      const res = await uploadFromUrl(linkSeleted.trim());
      console.log(res, linkSeleted);
      if (res) {
        setShowLink(false);
        showAlert({
          title: 'Success',
          message: 'Link uploaded successfully.',
        });
      }
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        'Something went wrong. Please check your internet connection.';
      showAlert({ title: 'Error', message: errMsg });
    } finally {
      setLinkLoading(false);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <CustomSafeAreaView dismissKeyboard={false} style={styles.container}>
      <Animated.ScrollView
        style={{ opacity: fadeAnim }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.locationCon}>
          <LocationIcon />
          <Text style={styles.location}>Mohali</Text>
        </View>

        <Text style={styles.title}>Pharmacy Nearby</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pharmacies.map((item, idx) => (
            <PharmacyCard key={idx} {...item} />
          ))}
        </ScrollView>

        <Text style={styles.uploadTitle}>Upload Prescription</Text>
        <Text style={styles.uploadSubtitle}>
          We will show the pharmacy that fits as per your prescription.
        </Text>

        {selectedImage ? (
          <View style={styles.previewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.previewImage}
            />
            <View style={styles.btnCont}>
              <TouchableText
                label="Cancel"
                onPress={() => {
                  setShowModal(false);
                  setSelectedImage('');
                }}
              />
              <TouchableText
                label="Change"
                onPress={() => setShowModal(true)}
                labelStyle={styles.bthText}
              />
            </View>
          </View>
        ) : selectedDoc ? (
          <View style={styles.previewContainer}>
            <Icon
              iconFamily="MaterialIcons"
              name="picture-as-pdf"
              size={50}
              color={colors.error}
            />
            <Text style={styles.pdfName}>
              {selectedDoc.split('/').pop()}.pdf
            </Text>
            <View style={styles.btnCont}>
              <TouchableText
                label="Cancel"
                onPress={() => {
                  setShowModal(false);
                  setSelectedDoc('');
                }}
              />
              <TouchableText
                label="Change"
                onPress={() => setShowModal(true)}
                labelStyle={styles.bthText}
              />
            </View>
          </View>
        ) : (
          <View style={styles.uploadContainer}>
            <UploadOption
              icon="link"
              label="Upload Link"
              onPress={() => setShowLink(true)}
            />
            <UploadOption
              icon="upload"
              label="Upload File"
              onPress={() => setShowModal(true)}
            />
          </View>
        )}

        <CustomButton
          title="Continue"
          onPress={onUploadFile}
          style={styles.button}
          loading={loading}
        />
      </Animated.ScrollView>
      <ImagePickerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onTakePhoto={handleTakePhoto}
        onChooseImage={hanleSelectImage}
        onPickDocument={handlePickDocument}
      />
      <LinkInputModal
        visible={showLink}
        onClose={() => {
          setShowLink(false);
          setLinkSelected('');
        }}
        setValue={setLinkSelected}
        onSubmit={pickLink}
        value={linkSeleted}
        loading={linkLoading}
      />
    </CustomSafeAreaView>
  );
};

export default PharmacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  scrollView: {
    paddingBottom: 40,
  },
  flex: {
    flex: 1,
  },
  locationCon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  location: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryText,
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontFamily: Fonts.PoppinsBold,
    color: colors.primaryText,
    marginTop: 20,
    textAlign: 'center',
  },
  uploadSubtitle: {
    color: colors.secondaryText,
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginVertical: 8,
  },
  uploadContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    marginTop: 16,
    backgroundColor: colors.white,
  },
  previewContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  pdfName: {
    fontSize: 16,
    fontFamily: Fonts.PoppinsSemiBold,
    color: colors.primaryText,
    marginBottom: 10,
    marginTop: 6,
  },
  btnCont: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 100,
  },
  bthText: {
    color: colors.blueBtn,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
});
