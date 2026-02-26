import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

const CreatorProfileScreen = ({ navigation, route }) => {
  const { creator } = route.params;
  const [activeTab, setActiveTab] = useState('about');

  const renderCover = () => (
    <View style={styles.coverContainer}>
      <Image source={{ uri: creator.cover }} style={styles.coverImage} />
      <View style={styles.coverOverlay} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={24} color={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.shareBtn}>
        <Ionicons name="share-outline" size={22} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );

  const renderProfileInfo = () => (
    <View style={styles.profileSection}>
      <Image source={{ uri: creator.avatar }} style={styles.avatar} />
      {creator.isOnline && <View style={styles.onlineDot} />}
      <Text style={styles.name}>{creator.name}</Text>
      <Text style={styles.handle}>{creator.handle}</Text>

      <View style={styles.statsRow}>
        {[
          { label: '완료', value: creator.completedCount },
          { label: '리뷰', value: creator.reviewCount },
          { label: '평점', value: creator.rating },
          { label: '팔로워', value: creator.followers },
        ].map((stat, i) => (
          <View key={stat.label} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            {i < 3 && <View style={styles.statDivider} />}
          </View>
        ))}
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={COLORS.success} />
          <Text style={styles.metaText}>{creator.responseTime}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="pricetag-outline" size={14} color={COLORS.primary} />
          <Text style={styles.metaText}>
            {creator.price.toLocaleString()}원~
          </Text>
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabs}>
      {[
        { key: 'about', label: '소개' },
        { key: 'samples', label: '샘플 영상' },
        { key: 'reviews', label: `리뷰 (${creator.reviewCount})` },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tab, activeTab === tab.key && styles.tabActive]}
          onPress={() => setActiveTab(tab.key)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.key && styles.tabTextActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAbout = () => (
    <View style={styles.tabContent}>
      <Text style={styles.bio}>{creator.bio}</Text>
      <View style={styles.tagsWrap}>
        {creator.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSamples = () => (
    <View style={styles.tabContent}>
      {creator.sampleVideos && creator.sampleVideos.length > 0 ? (
        <View style={styles.samplesGrid}>
          {creator.sampleVideos.map((video) => (
            <TouchableOpacity key={video.id} style={styles.sampleCard}>
              <Image
                source={{ uri: video.thumbnail }}
                style={styles.sampleThumb}
              />
              <View style={styles.playOverlay}>
                <Ionicons name="play-circle" size={40} color="rgba(255,255,255,0.9)" />
              </View>
              <Text style={styles.sampleTitle} numberOfLines={1}>
                {video.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>아직 샘플 영상이 없습니다</Text>
      )}
    </View>
  );

  const renderReviews = () => (
    <View style={styles.tabContent}>
      {creator.reviews && creator.reviews.length > 0 ? (
        creator.reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>
                    {review.user[0]}
                  </Text>
                </View>
                <Text style={styles.reviewUserName}>{review.user}</Text>
              </View>
              <View style={styles.reviewRating}>
                {Array(review.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={14}
                      color={COLORS.warning}
                    />
                  ))}
              </View>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.emptyText}>아직 리뷰가 없습니다</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {renderCover()}
        {renderProfileInfo()}
        {renderTabs()}
        {activeTab === 'about' && renderAbout()}
        {activeTab === 'samples' && renderSamples()}
        {activeTab === 'reviews' && renderReviews()}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomCta}>
        <View style={styles.ctaPriceInfo}>
          <Text style={styles.ctaPriceLabel}>시작가</Text>
          <Text style={styles.ctaPrice}>
            {creator.price.toLocaleString()}원
          </Text>
        </View>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() =>
            navigation.navigate('RequestForm', { creator })
          }
        >
          <Ionicons name="videocam" size={20} color={COLORS.white} />
          <Text style={styles.ctaButtonText}>영상 요청하기</Text>
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

  // Cover
  coverContainer: {
    height: 200,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareBtn: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Profile
  profileSection: {
    alignItems: 'center',
    marginTop: -50,
    paddingBottom: SIZES.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: COLORS.white,
  },
  onlineDot: {
    position: 'absolute',
    top: 35,
    right: width / 2 - 55,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.success,
    borderWidth: 3,
    borderColor: COLORS.white,
  },
  name: {
    ...FONTS.h2,
    marginTop: SIZES.sm,
  },
  handle: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginHorizontal: SIZES.md,
    paddingVertical: SIZES.md,
    ...SHADOWS.small,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  statLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    position: 'absolute',
    right: 0,
    top: 4,
    width: 1,
    height: 30,
    backgroundColor: COLORS.border,
  },
  metaRow: {
    flexDirection: 'row',
    marginTop: SIZES.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.sm,
  },
  metaText: {
    ...FONTS.caption,
    fontWeight: '600',
    marginLeft: 4,
  },

  // Tabs
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginTop: SIZES.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.bodyBold,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.primary,
  },

  // Tab Content
  tabContent: {
    padding: SIZES.md,
  },
  bio: {
    ...FONTS.body,
    lineHeight: 22,
    color: COLORS.text,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SIZES.md,
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: SIZES.radiusFull,
    marginRight: SIZES.sm,
    marginBottom: SIZES.sm,
  },
  tagText: {
    ...FONTS.caption,
    color: COLORS.primary,
    fontWeight: '600',
  },

  // Samples
  samplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sampleCard: {
    width: (width - 48) / 2,
    marginBottom: SIZES.md,
    borderRadius: SIZES.radiusSm,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  sampleThumb: {
    width: '100%',
    height: 110,
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
  },
  sampleTitle: {
    ...FONTS.caption,
    fontWeight: '600',
    padding: SIZES.sm,
  },

  // Reviews
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.sm,
    ...SHADOWS.small,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.sm,
  },
  reviewAvatarText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
  },
  reviewUserName: {
    ...FONTS.bodyBold,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewText: {
    ...FONTS.body,
    lineHeight: 20,
    color: COLORS.text,
  },
  reviewDate: {
    ...FONTS.small,
    color: COLORS.textLight,
    marginTop: SIZES.sm,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: SIZES.xl,
  },

  // Bottom CTA
  bottomCta: {
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
  ctaPriceInfo: {
    marginRight: SIZES.md,
  },
  ctaPriceLabel: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  ctaPrice: {
    ...FONTS.h3,
    color: COLORS.primary,
  },
  ctaButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
  },
  ctaButtonText: {
    ...FONTS.h4,
    color: COLORS.white,
    marginLeft: SIZES.sm,
  },
});

export default CreatorProfileScreen;
