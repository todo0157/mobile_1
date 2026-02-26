import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { CATEGORIES, CREATORS } from '../data/mockData';
import CreatorCard from '../components/CreatorCard';
import CategoryChip from '../components/CategoryChip';
import SectionHeader from '../components/SectionHeader';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const featuredCreators = CREATORS.filter((c) => c.isFeatured);
  const popularCreators = [...CREATORS].sort((a, b) => b.reviewCount - a.reviewCount);

  const renderHeroBanner = () => (
    <View style={styles.hero}>
      <View style={styles.heroContent}>
        <Text style={styles.heroLabel}>크리에이터 영상 메시지</Text>
        <Text style={styles.heroTitle}>
          좋아하는 크리에이터에게{'\n'}
          <Text style={styles.heroHighlight}>특별한 영상</Text>을 받아보세요
        </Text>
        <Text style={styles.heroSubtitle}>
          생일 축하, 응원, 프로포즈까지{'\n'}세상에 단 하나뿐인 맞춤 영상 메시지
        </Text>
        <TouchableOpacity
          style={styles.heroCta}
          onPress={() => navigation.navigate('Explore')}
        >
          <Text style={styles.heroCtaText}>크리에이터 찾기</Text>
          <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <View style={styles.heroDecoration}>
        <Text style={styles.heroEmoji}>🎬</Text>
      </View>
    </View>
  );

  const renderHowItWorks = () => (
    <View style={styles.howItWorks}>
      <Text style={styles.howTitle}>이용 방법</Text>
      <View style={styles.stepsRow}>
        {[
          { step: '1', icon: 'search', label: '크리에이터\n선택' },
          { step: '2', icon: 'create', label: '메시지\n작성' },
          { step: '3', icon: 'card', label: '결제하기' },
          { step: '4', icon: 'videocam', label: '영상 받기' },
        ].map((item, index) => (
          <View key={item.step} style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Ionicons name={item.icon} size={22} color={COLORS.white} />
            </View>
            {index < 3 && <View style={styles.stepLine} />}
            <Text style={styles.stepLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>FanVoice</Text>
          <Text style={styles.logoSub}>크리에이터 영상 메시지</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Banner */}
        {renderHeroBanner()}

        {/* Categories */}
        <SectionHeader title="카테고리" />
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryChip
              category={item}
              onPress={() =>
                navigation.navigate('Explore', { category: item.name })
              }
            />
          )}
        />

        {/* Featured Creators */}
        <SectionHeader
          title="인기 크리에이터"
          onSeeAll={() => navigation.navigate('Explore')}
        />
        <FlatList
          data={featuredCreators}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.creatorList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CreatorCard
              creator={item}
              onPress={() =>
                navigation.navigate('CreatorProfile', { creator: item })
              }
            />
          )}
        />

        {/* Popular Creators */}
        <SectionHeader
          title="리뷰가 많은 크리에이터"
          onSeeAll={() => navigation.navigate('Explore')}
        />
        <FlatList
          data={popularCreators.slice(0, 4)}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.creatorList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CreatorCard
              creator={item}
              size="small"
              onPress={() =>
                navigation.navigate('CreatorProfile', { creator: item })
              }
            />
          )}
        />

        {/* How It Works */}
        {renderHowItWorks()}

        <View style={{ height: 30 }} />
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingTop: SIZES.xxl,
    paddingBottom: SIZES.sm,
    backgroundColor: COLORS.white,
  },
  logo: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  logoSub: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    marginTop: -2,
  },
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.accent,
  },

  // Hero
  hero: {
    marginHorizontal: SIZES.md,
    marginTop: SIZES.md,
    borderRadius: SIZES.radiusLg,
    backgroundColor: COLORS.primary,
    padding: SIZES.lg,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
  },
  heroLabel: {
    ...FONTS.caption,
    color: COLORS.primaryLight,
    fontWeight: '600',
    marginBottom: SIZES.xs,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    lineHeight: 30,
    marginBottom: SIZES.sm,
  },
  heroHighlight: {
    color: COLORS.warning,
  },
  heroSubtitle: {
    ...FONTS.caption,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
    marginBottom: SIZES.md,
  },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
  },
  heroCtaText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
    marginRight: 6,
  },
  heroDecoration: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  heroEmoji: {
    fontSize: 64,
  },

  // Categories
  categoryList: {
    paddingHorizontal: SIZES.md,
    paddingBottom: SIZES.xs,
  },

  // Creators
  creatorList: {
    paddingHorizontal: SIZES.md,
    paddingBottom: SIZES.sm,
  },

  // How It Works
  howItWorks: {
    marginHorizontal: SIZES.md,
    marginTop: SIZES.lg,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    ...SHADOWS.small,
  },
  howTitle: {
    ...FONTS.h3,
    textAlign: 'center',
    marginBottom: SIZES.lg,
  },
  stepsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  stepLine: {
    position: 'absolute',
    top: 24,
    right: -20,
    width: 40,
    height: 2,
    backgroundColor: COLORS.primaryLight,
  },
  stepLabel: {
    ...FONTS.caption,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default HomeScreen;
