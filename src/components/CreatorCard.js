import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

const CreatorCard = ({ creator, onPress, size = 'medium' }) => {
  const isSmall = size === 'small';

  return (
    <TouchableOpacity
      style={[styles.container, isSmall && styles.containerSmall, SHADOWS.medium]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={{ uri: creator.avatar }}
        style={[styles.avatar, isSmall && styles.avatarSmall]}
      />
      {creator.isOnline && (
        <View style={[styles.onlineDot, isSmall && styles.onlineDotSmall]} />
      )}
      <View style={styles.info}>
        <Text style={[styles.name, isSmall && styles.nameSmall]} numberOfLines={1}>
          {creator.name}
        </Text>
        <Text style={styles.category}>{creator.category}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={COLORS.warning} />
          <Text style={styles.rating}>{creator.rating}</Text>
          <Text style={styles.reviewCount}>({creator.reviewCount})</Text>
        </View>
        <Text style={styles.price}>
          {creator.price.toLocaleString()}원~
        </Text>
      </View>
      {creator.isFeatured && (
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>HOT</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginRight: SIZES.md,
    width: 160,
    alignItems: 'center',
  },
  containerSmall: {
    width: 130,
    padding: SIZES.sm,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SIZES.sm,
  },
  avatarSmall: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineDot: {
    position: 'absolute',
    top: 72,
    right: 36,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  onlineDotSmall: {
    top: 52,
    right: 30,
    width: 12,
    height: 12,
  },
  info: {
    alignItems: 'center',
  },
  name: {
    ...FONTS.h4,
    marginBottom: 2,
  },
  nameSmall: {
    fontSize: 14,
  },
  category: {
    ...FONTS.caption,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 3,
  },
  reviewCount: {
    ...FONTS.small,
    marginLeft: 2,
  },
  price: {
    ...FONTS.bodyBold,
    color: COLORS.primary,
  },
  featuredBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
  },
  featuredText: {
    ...FONTS.small,
    color: COLORS.white,
    fontWeight: '700',
  },
});

export default CreatorCard;
