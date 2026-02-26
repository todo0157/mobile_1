import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const CategoryChip = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, isSelected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.emoji}>{category.emoji}</Text>
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: SIZES.sm,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  emoji: {
    fontSize: 16,
    marginRight: 6,
  },
  label: {
    ...FONTS.bodyBold,
    color: COLORS.text,
  },
  labelSelected: {
    color: COLORS.white,
  },
});

export default CategoryChip;
