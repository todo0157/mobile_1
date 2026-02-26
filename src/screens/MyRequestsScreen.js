import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, SHADOWS } from '../constants/theme';
import { MY_REQUESTS } from '../data/mockData';

const STATUS_CONFIG = {
  pending: {
    label: '대기 중',
    color: COLORS.warning,
    bgColor: '#FFF8E1',
    icon: 'time',
  },
  in_progress: {
    label: '제작 중',
    color: COLORS.secondary,
    bgColor: '#E0F7FA',
    icon: 'videocam',
  },
  completed: {
    label: '완료',
    color: COLORS.success,
    bgColor: '#E8F5E9',
    icon: 'checkmark-circle',
  },
};

const MyRequestsScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('all');

  const filteredRequests =
    filter === 'all'
      ? MY_REQUESTS
      : MY_REQUESTS.filter((r) => r.status === filter);

  const renderFilterTabs = () => (
    <View style={styles.filterRow}>
      {[
        { key: 'all', label: '전체' },
        { key: 'pending', label: '대기 중' },
        { key: 'in_progress', label: '제작 중' },
        { key: 'completed', label: '완료' },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.filterChip, filter === tab.key && styles.filterChipActive]}
          onPress={() => setFilter(tab.key)}
        >
          <Text
            style={[
              styles.filterText,
              filter === tab.key && styles.filterTextActive,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderRequestCard = ({ item }) => {
    const status = STATUS_CONFIG[item.status];

    return (
      <View style={[styles.card, SHADOWS.small]}>
        {/* Creator Row */}
        <View style={styles.cardHeader}>
          <TouchableOpacity
            style={styles.creatorRow}
            onPress={() =>
              navigation.navigate('CreatorProfile', {
                creator: item.creator,
              })
            }
          >
            <Image
              source={{ uri: item.creator.avatar }}
              style={styles.avatar}
            />
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorName}>{item.creator.name}</Text>
              <Text style={styles.creatorCategory}>
                {item.creator.category}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={[styles.statusBadge, { backgroundColor: status.bgColor }]}>
            <Ionicons name={status.icon} size={14} color={status.color} />
            <Text style={[styles.statusText, { color: status.color }]}>
              {status.label}
            </Text>
          </View>
        </View>

        {/* Request Details */}
        <View style={styles.cardBody}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>받는 사람</Text>
            <Text style={styles.detailValue}>{item.recipientName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>상황</Text>
            <Text style={styles.detailValue}>{item.occasion}</Text>
          </View>
          <View style={styles.messageBox}>
            <Text style={styles.messageText} numberOfLines={2}>
              "{item.message}"
            </Text>
          </View>
        </View>

        {/* Card Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>요청일</Text>
            <Text style={styles.dateValue}>{item.requestDate}</Text>
          </View>
          <View style={styles.priceInfo}>
            <Text style={styles.priceValue}>
              {item.price.toLocaleString()}원
            </Text>
          </View>
        </View>

        {/* Action Button */}
        {item.status === 'completed' && (
          <TouchableOpacity
            style={styles.watchButton}
            onPress={() =>
              Alert.alert('영상 보기', '영상 플레이어가 열립니다. (MVP 데모)')
            }
          >
            <Ionicons name="play-circle" size={20} color={COLORS.white} />
            <Text style={styles.watchButtonText}>영상 보기</Text>
          </TouchableOpacity>
        )}

        {item.status === 'pending' && (
          <View style={styles.pendingInfo}>
            <Ionicons name="information-circle" size={16} color={COLORS.warning} />
            <Text style={styles.pendingText}>
              크리에이터가 요청을 확인 중입니다
            </Text>
          </View>
        )}

        {item.status === 'in_progress' && (
          <View style={styles.pendingInfo}>
            <Ionicons name="videocam" size={16} color={COLORS.secondary} />
            <Text style={[styles.pendingText, { color: COLORS.secondary }]}>
              영상을 제작하고 있습니다
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>내 요청</Text>
        <Text style={styles.headerSubtitle}>
          총 {MY_REQUESTS.length}건의 요청
        </Text>
      </View>

      {renderFilterTabs()}

      <FlatList
        data={filteredRequests}
        keyExtractor={(item) => item.id}
        renderItem={renderRequestCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>요청이 없습니다</Text>
            <Text style={styles.emptySubtext}>
              크리에이터에게 첫 영상을 요청해 보세요!
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Explore')}
            >
              <Text style={styles.emptyButtonText}>크리에이터 찾기</Text>
            </TouchableOpacity>
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
  headerSubtitle: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Filters
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: SIZES.radiusFull,
    marginRight: SIZES.sm,
    backgroundColor: COLORS.gray100,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },

  // List
  listContent: {
    padding: SIZES.md,
    paddingBottom: SIZES.xxl,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  creatorInfo: {
    marginLeft: SIZES.sm,
  },
  creatorName: {
    ...FONTS.bodyBold,
  },
  creatorCategory: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: SIZES.radiusFull,
  },
  statusText: {
    ...FONTS.small,
    fontWeight: '700',
    marginLeft: 4,
  },

  // Body
  cardBody: {
    marginBottom: SIZES.sm,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    width: 70,
  },
  detailValue: {
    ...FONTS.caption,
    fontWeight: '600',
    color: COLORS.text,
  },
  messageBox: {
    backgroundColor: COLORS.gray100,
    borderRadius: SIZES.radiusSm,
    padding: SIZES.sm,
    marginTop: SIZES.xs,
  },
  messageText: {
    ...FONTS.caption,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
  },

  // Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateLabel: {
    ...FONTS.small,
    color: COLORS.textLight,
    marginRight: 4,
  },
  dateValue: {
    ...FONTS.small,
    color: COLORS.textSecondary,
  },
  priceValue: {
    ...FONTS.bodyBold,
    color: COLORS.primary,
  },

  // Action buttons
  watchButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: SIZES.radiusSm,
    marginTop: SIZES.sm,
  },
  watchButtonText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
    marginLeft: SIZES.sm,
  },
  pendingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
    paddingTop: SIZES.sm,
  },
  pendingText: {
    ...FONTS.small,
    color: COLORS.warning,
    fontWeight: '600',
    marginLeft: 6,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SIZES.md,
  },
  emptyTitle: {
    ...FONTS.h3,
    color: COLORS.textSecondary,
  },
  emptySubtext: {
    ...FONTS.caption,
    marginTop: 4,
    marginBottom: SIZES.lg,
  },
  emptyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.lg,
    paddingVertical: 10,
    borderRadius: SIZES.radiusFull,
  },
  emptyButtonText: {
    ...FONTS.bodyBold,
    color: COLORS.white,
  },
});

export default MyRequestsScreen;
