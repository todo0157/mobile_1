import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { CATEGORIES, CREATORS } from '../data/mockData';

const SORT_OPTIONS = [
  { key: 'popular', label: '인기순' },
  { key: 'rating', label: '평점순' },
  { key: 'price_low', label: '가격 낮은순' },
  { key: 'price_high', label: '가격 높은순' },
];

const ExploreScreen = ({ navigation, route }) => {
  const initialCategory = route?.params?.category || null;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');

  const filteredCreators = useMemo(() => {
    let result = [...CREATORS];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedCategory) {
      result = result.filter((c) => c.category === selectedCategory);
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const renderCreatorItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.creatorCard, SHADOWS.small]}
      onPress={() => navigation.navigate('CreatorProfile', { creator: item })}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      {item.isOnline && <View style={styles.onlineDot} />}
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.creatorName}>{item.name}</Text>
          {item.isFeatured && (
            <View style={styles.hotBadge}>
              <Text style={styles.hotText}>HOT</Text>
            </View>
          )}
        </View>
        <Text style={styles.creatorCategory}>
          {item.category} · {item.followers} 팔로워
        </Text>
        <View style={styles.cardMeta}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={13} color={COLORS.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviewCount})</Text>
          </View>
          <Text style={styles.responseTime}>{item.responseTime}</Text>
        </View>
        <View style={styles.tagsRow}>
          {item.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.priceSection}>
        <Text style={styles.priceLabel}>시작가</Text>
        <Text style={styles.price}>{(item.price / 10000).toFixed(0)}만원</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>탐색</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.gray500} />
          <TextInput
            style={styles.searchInput}
            placeholder="크리에이터, 카테고리 검색..."
            placeholderTextColor={COLORS.gray500}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <FlatList
        data={[{ id: '0', name: '전체', emoji: '🔥' }, ...CATEGORIES]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isAll = item.id === '0';
          const isSelected = isAll
            ? selectedCategory === null
            : selectedCategory === item.name;
          return (
            <TouchableOpacity
              style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
              onPress={() => setSelectedCategory(isAll ? null : item.name)}
            >
              <Text style={styles.categoryEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.categoryLabel,
                  isSelected && styles.categoryLabelSelected,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Sort Options */}
      <View style={styles.sortRow}>
        <Text style={styles.resultCount}>
          {filteredCreators.length}명의 크리에이터
        </Text>
        <View style={styles.sortOptions}>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.sortChip, sortBy === opt.key && styles.sortChipActive]}
              onPress={() => setSortBy(opt.key)}
            >
              <Text
                style={[
                  styles.sortText,
                  sortBy === opt.key && styles.sortTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Creator List */}
      <FlatList
        data={filteredCreators}
        keyExtractor={(item) => item.id}
        renderItem={renderCreatorItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
            <Text style={styles.emptySubtext}>
              다른 키워드로 검색해 보세요
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingTop: SIZES.xxl,
    paddingHorizontal: SIZES.md,
    paddingBottom: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    ...FONTS.h2,
  },

  // Search
  searchContainer: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: SIZES.radiusFull,
    paddingHorizontal: SIZES.md,
    height: 44,
  },
  searchInput: {
    flex: 1,
    ...FONTS.body,
    marginLeft: SIZES.sm,
    color: COLORS.text,
  },

  // Categories
  categoryList: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    marginRight: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryLabel: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
  },
  categoryLabelSelected: {
    color: COLORS.white,
  },

  // Sort
  sortRow: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
  },
  resultCount: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  sortOptions: {
    flexDirection: 'row',
  },
  sortChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
    marginRight: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  sortChipActive: {
    backgroundColor: COLORS.primary,
  },
  sortText: {
    ...FONTS.small,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  sortTextActive: {
    color: COLORS.white,
  },

  // Creator Card
  listContent: {
    paddingHorizontal: SIZES.md,
    paddingBottom: SIZES.xl,
  },
  creatorCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    alignItems: 'center',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  onlineDot: {
    position: 'absolute',
    top: 56,
    left: 56,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  cardInfo: {
    flex: 1,
    marginLeft: SIZES.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorName: {
    ...FONTS.h4,
    marginRight: 6,
  },
  hotBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  hotText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.white,
  },
  creatorCategory: {
    ...FONTS.caption,
    marginTop: 2,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  ratingText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: 3,
  },
  reviewText: {
    ...FONTS.small,
    marginLeft: 2,
  },
  responseTime: {
    ...FONTS.small,
    color: COLORS.success,
  },
  tagsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  tagText: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  priceSection: {
    alignItems: 'flex-end',
    marginLeft: SIZES.sm,
  },
  priceLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  price: {
    ...FONTS.h4,
    color: COLORS.primary,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SIZES.md,
  },
  emptyText: {
    ...FONTS.h4,
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    ...FONTS.caption,
    marginTop: 4,
  },
});

export default ExploreScreen;
