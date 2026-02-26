import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { OCCASIONS } from '../data/mockData';

const RequestFormScreen = ({ navigation, route }) => {
  const { creator } = route.params;
  const [recipientName, setRecipientName] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [message, setMessage] = useState('');
  const [isForSelf, setIsForSelf] = useState(false);

  const maxMessageLength = 250;

  const handleSubmit = () => {
    if (!recipientName.trim()) {
      Alert.alert('알림', '받는 사람 이름을 입력해 주세요.');
      return;
    }
    if (!selectedOccasion) {
      Alert.alert('알림', '상황을 선택해 주세요.');
      return;
    }
    if (!message.trim()) {
      Alert.alert('알림', '메시지를 작성해 주세요.');
      return;
    }

    Alert.alert(
      '요청 확인',
      `${creator.name}님에게 영상을 요청합니다.\n\n금액: ${creator.price.toLocaleString()}원\n\n결제를 진행하시겠습니까?`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '결제하기',
          onPress: () => {
            Alert.alert(
              '요청 완료!',
              `${creator.name}님에게 영상 요청이 전송되었습니다.\n${creator.responseTime} 내에 영상을 받으실 수 있습니다.`,
              [
                {
                  text: '확인',
                  onPress: () => navigation.navigate('MyRequests'),
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>영상 요청</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Creator Info */}
        <View style={[styles.creatorInfo, SHADOWS.small]}>
          <Image source={{ uri: creator.avatar }} style={styles.avatar} />
          <View style={styles.creatorMeta}>
            <Text style={styles.creatorName}>{creator.name}</Text>
            <Text style={styles.creatorCategory}>{creator.category}</Text>
            <View style={styles.ratingRow}>
              <Ionicons name="star" size={13} color={COLORS.warning} />
              <Text style={styles.ratingText}>
                {creator.rating} ({creator.reviewCount})
              </Text>
            </View>
          </View>
          <View style={styles.priceTag}>
            <Text style={styles.priceLabel}>요청 금액</Text>
            <Text style={styles.price}>
              {creator.price.toLocaleString()}원
            </Text>
          </View>
        </View>

        {/* For Self Toggle */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.selfToggle}
            onPress={() => {
              setIsForSelf(!isForSelf);
              if (!isForSelf) setRecipientName('나');
              else setRecipientName('');
            }}
          >
            <View
              style={[styles.checkbox, isForSelf && styles.checkboxChecked]}
            >
              {isForSelf && (
                <Ionicons name="checkmark" size={16} color={COLORS.white} />
              )}
            </View>
            <Text style={styles.selfToggleText}>
              본인을 위한 영상이에요
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recipient Name */}
        <View style={styles.section}>
          <Text style={styles.label}>받는 사람</Text>
          <TextInput
            style={styles.input}
            placeholder="받는 사람 이름을 입력하세요"
            placeholderTextColor={COLORS.gray500}
            value={recipientName}
            onChangeText={setRecipientName}
            editable={!isForSelf}
          />
        </View>

        {/* Occasion */}
        <View style={styles.section}>
          <Text style={styles.label}>어떤 상황인가요?</Text>
          <View style={styles.occasionGrid}>
            {OCCASIONS.map((occ) => (
              <TouchableOpacity
                key={occ.id}
                style={[
                  styles.occasionChip,
                  selectedOccasion === occ.id && styles.occasionChipSelected,
                ]}
                onPress={() => setSelectedOccasion(occ.id)}
              >
                <Text style={styles.occasionEmoji}>{occ.emoji}</Text>
                <Text
                  style={[
                    styles.occasionLabel,
                    selectedOccasion === occ.id &&
                      styles.occasionLabelSelected,
                  ]}
                >
                  {occ.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Message */}
        <View style={styles.section}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>크리에이터에게 전할 메시지</Text>
            <Text style={styles.charCount}>
              {message.length}/{maxMessageLength}
            </Text>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder={`${creator.name}님에게 영상에 담아줬으면 하는 내용을 자세히 적어주세요.\n\n예: "제 친구 철수의 생일인데, 항상 게임왕님 영상을 좋아해요. 생일 축하한다고 말해주시면 정말 좋아할 것 같아요!"`}
            placeholderTextColor={COLORS.gray500}
            value={message}
            onChangeText={(text) =>
              text.length <= maxMessageLength && setMessage(text)
            }
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        {/* Guidelines */}
        <View style={[styles.guidelineBox, SHADOWS.small]}>
          <Text style={styles.guidelineTitle}>요청 안내</Text>
          {[
            `${creator.responseTime} 내에 영상이 제작됩니다`,
            '영상 길이는 약 30초~1분입니다',
            '부적절한 내용은 거절될 수 있습니다',
            '크리에이터가 거절 시 전액 환불됩니다',
          ].map((text, i) => (
            <View key={i} style={styles.guidelineItem}>
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={COLORS.success}
              />
              <Text style={styles.guidelineText}>{text}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Payment */}
      <View style={styles.bottomBar}>
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>결제 금액</Text>
          <Text style={styles.totalPrice}>
            {creator.price.toLocaleString()}원
          </Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handleSubmit}>
          <Ionicons name="card" size={20} color={COLORS.white} />
          <Text style={styles.payButtonText}>결제하고 요청하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SIZES.xxl,
    paddingHorizontal: SIZES.md,
    paddingBottom: SIZES.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...FONTS.h3,
  },
  content: {
    padding: SIZES.md,
  },

  // Creator Info
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  creatorMeta: {
    flex: 1,
    marginLeft: SIZES.sm,
  },
  creatorName: {
    ...FONTS.h4,
  },
  creatorCategory: {
    ...FONTS.caption,
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  ratingText: {
    ...FONTS.caption,
    fontWeight: '600',
    marginLeft: 3,
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  priceLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  price: {
    ...FONTS.h3,
    color: COLORS.primary,
  },

  // Self Toggle
  selfToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.xs,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.gray400,
    marginRight: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  selfToggleText: {
    ...FONTS.body,
    color: COLORS.text,
  },

  // Section
  section: {
    marginBottom: SIZES.lg,
  },
  label: {
    ...FONTS.bodyBold,
    marginBottom: SIZES.sm,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  charCount: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusSm,
    paddingHorizontal: SIZES.md,
    height: 48,
    ...FONTS.body,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.md,
    minHeight: 140,
    ...FONTS.body,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  // Occasions
  occasionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  occasionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: SIZES.sm,
    marginBottom: SIZES.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  occasionChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  occasionEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  occasionLabel: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
  },
  occasionLabelSelected: {
    color: COLORS.white,
  },

  // Guidelines
  guidelineBox: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
  },
  guidelineTitle: {
    ...FONTS.bodyBold,
    marginBottom: SIZES.sm,
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  guidelineText: {
    ...FONTS.caption,
    marginLeft: SIZES.sm,
    color: COLORS.textSecondary,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    paddingBottom: SIZES.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.medium,
  },
  totalSection: {
    marginRight: SIZES.md,
  },
  totalLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  totalPrice: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  payButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
  },
  payButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: SIZES.sm,
  },
});

export default RequestFormScreen;
