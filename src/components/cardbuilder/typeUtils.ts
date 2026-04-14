/**
 * Type utilities for the card builder system.
 *
 * This module centralises the narrow/guard/assertion helpers that were previously
 * duplicated across cardbuilder, listview, and homesections. Keeping them here
 * makes it straightforward to extend card types without touching multiple files.
 */

import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models/base-item-dto';
import type { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import type { ImageType } from '@jellyfin/sdk/lib/generated-client/models/image-type';
import type { MediaType } from '@jellyfin/sdk/lib/generated-client/models/media-type';

// ---------------------------------------------------------------------------
// Shape helpers
// ---------------------------------------------------------------------------

export type CardShape =
    | 'portrait'
    | 'portrait-mini'
    | 'landscape'
    | 'landscape-mini'
    | 'square'
    | 'square-mini'
    | 'backdrop'
    | 'banner'
    | 'auto';

export const PORTRAIT_SHAPES: ReadonlySet<CardShape> = new Set([
    'portrait',
    'portrait-mini',
]);

export const LANDSCAPE_SHAPES: ReadonlySet<CardShape> = new Set([
    'landscape',
    'landscape-mini',
    'backdrop',
    'banner',
]);

export const SQUARE_SHAPES: ReadonlySet<CardShape> = new Set([
    'square',
    'square-mini',
]);

export function isPortraitShape(shape: CardShape): boolean {
    return PORTRAIT_SHAPES.has(shape);
}

export function isLandscapeShape(shape: CardShape): boolean {
    return LANDSCAPE_SHAPES.has(shape);
}

export function isSquareShape(shape: CardShape): boolean {
    return SQUARE_SHAPES.has(shape);
}

export function getAspectRatio(shape: CardShape): number {
    if (isPortraitShape(shape)) return 2 / 3;
    if (isLandscapeShape(shape)) return 16 / 9;
    return 1;
}

// ---------------------------------------------------------------------------
// Item kind helpers
// ---------------------------------------------------------------------------

const EPISODE_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'Episode' as BaseItemKind,
]);

const SEASON_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'Season' as BaseItemKind,
]);

const SERIES_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'Series' as BaseItemKind,
]);

const MOVIE_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'Movie' as BaseItemKind,
    'AdultVideo' as BaseItemKind,
]);

const FOLDER_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'CollectionFolder' as BaseItemKind,
    'Folder' as BaseItemKind,
    'UserView' as BaseItemKind,
    'Channel' as BaseItemKind,
    'ManualPlaylistsFolder' as BaseItemKind,
    'Playlist' as BaseItemKind,
    'BoxSet' as BaseItemKind,
]);

const MUSIC_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'MusicAlbum' as BaseItemKind,
    'MusicArtist' as BaseItemKind,
    'MusicGenre' as BaseItemKind,
    'Audio' as BaseItemKind,
]);

const BOOK_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'Book' as BaseItemKind,
]);

const PHOTO_KINDS: ReadonlySet<BaseItemKind> = new Set([
    'Photo' as BaseItemKind,
    'PhotoAlbum' as BaseItemKind,
]);

export function isEpisode(item: BaseItemDto): boolean {
    return item.Type != null && EPISODE_KINDS.has(item.Type as BaseItemKind);
}

export function isSeason(item: BaseItemDto): boolean {
    return item.Type != null && SEASON_KINDS.has(item.Type as BaseItemKind);
}

export function isSeries(item: BaseItemDto): boolean {
    return item.Type != null && SERIES_KINDS.has(item.Type as BaseItemKind);
}

export function isMovie(item: BaseItemDto): boolean {
    return item.Type != null && MOVIE_KINDS.has(item.Type as BaseItemKind);
}

export function isFolder(item: BaseItemDto): boolean {
    return item.Type != null && (FOLDER_KINDS.has(item.Type as BaseItemKind) || !!item.IsFolder);
}

export function isMusicItem(item: BaseItemDto): boolean {
    return item.Type != null && MUSIC_KINDS.has(item.Type as BaseItemKind);
}

export function isBook(item: BaseItemDto): boolean {
    return item.Type != null && BOOK_KINDS.has(item.Type as BaseItemKind);
}

export function isPhoto(item: BaseItemDto): boolean {
    return item.Type != null && PHOTO_KINDS.has(item.Type as BaseItemKind);
}

export function isVideoItem(item: BaseItemDto): boolean {
    return item.MediaType === ('Video' as MediaType);
}

export function isAudioItem(item: BaseItemDto): boolean {
    return item.MediaType === ('Audio' as MediaType);
}

// ---------------------------------------------------------------------------
// Default shape resolution
// ---------------------------------------------------------------------------

export function getDefaultShapeForItem(item: BaseItemDto): CardShape {
    if (isEpisode(item) || isSeason(item) || isMovie(item) || isVideoItem(item)) {
        return 'backdrop';
    }
    if (isMusicItem(item)) {
        return 'square';
    }
    if (isBook(item)) {
        return 'portrait';
    }
    if (isPhoto(item)) {
        return 'square';
    }
    return 'portrait';
}

// ---------------------------------------------------------------------------
// Preferred image type resolution
// ---------------------------------------------------------------------------

export function getPreferredImageType(shape: CardShape, item: BaseItemDto): ImageType {
    if (isLandscapeShape(shape)) {
        if (item.ParentThumbItemId || item.SeriesThumbImageTag || item.ParentBackdropItemId) {
            return 'Thumb' as ImageType;
        }
        return 'Backdrop' as ImageType;
    }

    if (isSquareShape(shape) && isMusicItem(item)) {
        return 'Primary' as ImageType;
    }

    if (isPortraitShape(shape)) {
        if (isSeries(item) || isMovie(item) || isBook(item)) {
            return 'Primary' as ImageType;
        }
    }

    return 'Primary' as ImageType;
}

// ---------------------------------------------------------------------------
// Overlay visibility
// ---------------------------------------------------------------------------

export interface OverlayFlags {
    showPlayButton: boolean
    showProgress: boolean
    showUnwatched: boolean
    showMarker: boolean
    showChildCount: boolean
}

export function resolveOverlayFlags(item: BaseItemDto, opts: {
    showPlayCount?: boolean
    showUnwatchedIndicator?: boolean
    showChildCountBadge?: boolean
} = {}): OverlayFlags {
    const isPlayable = isVideoItem(item) || isAudioItem(item)
        || isEpisode(item) || isMovie(item) || isSeries(item);

    const hasProgress = typeof item.UserData?.PlayedPercentage === 'number'
        && item.UserData.PlayedPercentage > 0
        && item.UserData.PlayedPercentage < 100;

    const isUnwatched = item.UserData?.Played === false
        && (isVideoItem(item) || isEpisode(item) || isMovie(item));

    const hasMarker = typeof item.UserData?.UnplayedItemCount === 'number'
        && item.UserData.UnplayedItemCount > 0;

    const hasChildren = typeof item.ChildCount === 'number' && item.ChildCount > 0;

    return {
        showPlayButton: isPlayable,
        showProgress: hasProgress,
        showUnwatched: isUnwatched && (opts.showUnwatchedIndicator ?? true),
        showMarker: hasMarker,
        showChildCount: hasChildren && (opts.showChildCountBadge ?? false),
    };
}

// ---------------------------------------------------------------------------
// Text line helpers
// ---------------------------------------------------------------------------

export interface CardTextLines {
    primary: string | null | undefined
    secondary: string | null | undefined
    tertiary: string | null | undefined
}

export function getCardTextLines(item: BaseItemDto): CardTextLines {
    if (isEpisode(item)) {
        return {
            primary: item.SeriesName,
            secondary: item.SeasonName ?? null,
            tertiary: item.Name,
        };
    }

    if (isSeason(item)) {
        return {
            primary: item.SeriesName,
            secondary: item.Name,
            tertiary: null,
        };
    }

    if (isMovie(item)) {
        return {
            primary: item.Name,
            secondary: item.ProductionYear != null ? String(item.ProductionYear) : null,
            tertiary: null,
        };
    }

    if (isMusicItem(item)) {
        return {
            primary: item.Name,
            secondary: item.AlbumArtist ?? item.Artists?.[0] ?? null,
            tertiary: null,
        };
    }

    return {
        primary: item.Name,
        secondary: null,
        tertiary: null,
    };
}

// ---------------------------------------------------------------------------
// Runtime formatting helpers
// ---------------------------------------------------------------------------

const TICKS_PER_SECOND = 10_000_000;
const TICKS_PER_MINUTE = TICKS_PER_SECOND * 60;
const TICKS_PER_HOUR = TICKS_PER_MINUTE * 60;

export function ticksToMinutes(ticks: number): number {
    return Math.floor(ticks / TICKS_PER_MINUTE);
}

export function ticksToHoursAndMinutes(ticks: number): { hours: number; minutes: number } {
    const hours = Math.floor(ticks / TICKS_PER_HOUR);
    const minutes = Math.floor((ticks % TICKS_PER_HOUR) / TICKS_PER_MINUTE);
    return { hours, minutes };
}

export function formatRuntime(ticks: number): string {
    const { hours, minutes } = ticksToHoursAndMinutes(ticks);
    if (hours === 0) return `${minutes}m`;
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}

// ---------------------------------------------------------------------------
// Genre list helpers
// ---------------------------------------------------------------------------

export function getGenreString(item: BaseItemDto, maxGenres = 3): string {
    const genres = item.Genres ?? [];
    if (genres.length === 0) return '';
    return genres.slice(0, maxGenres).join(', ');
}

// ---------------------------------------------------------------------------
// Type guards for discriminated union narrowing
// ---------------------------------------------------------------------------

export function assertNonNullable<T>(value: T, label = 'value'): asserts value is NonNullable<T> {
    if (value == null) {
        throw new TypeError(`Expected ${label} to be non-nullable, got ${String(value)}`);
    }
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
    return value != null;
}

export function filterNonNullable<T>(arr: (T | null | undefined)[]): T[] {
    return arr.filter(isNonNullable);
}

// ---------------------------------------------------------------------------
// Card option strict types
// ---------------------------------------------------------------------------

export type CardActionType =
    | 'play'
    | 'playallfromhere'
    | 'queueallfromhere'
    | 'resume'
    | 'link'
    | 'programtoggle'
    | 'instant_mix'
    | 'shuffle'
    | 'none';

export type CardIndicatorType =
    | 'playing'
    | 'unplayed'
    | 'played'
    | 'childcount'
    | 'mediasourcecount'
    | 'progress';

export interface CardDisplayOptions {
    showTitle?: boolean
    showYear?: boolean
    showSeriesYear?: boolean
    showRuntime?: boolean
    showAirTime?: boolean
    showChannelName?: boolean
    showCurrentProgram?: boolean
    showCurrentProgramTime?: boolean
    showVideoStreamInfo?: boolean
    defaultAction?: CardActionType
    coverImage?: boolean
    cardLayout?: boolean
    showMissingEpisodes?: boolean
    showSpecials?: boolean
    showDetailsMenu?: boolean
}

export const DEFAULT_DISPLAY_OPTIONS: Required<CardDisplayOptions> = {
    showTitle: true,
    showYear: false,
    showSeriesYear: false,
    showRuntime: false,
    showAirTime: false,
    showChannelName: false,
    showCurrentProgram: false,
    showCurrentProgramTime: false,
    showVideoStreamInfo: false,
    defaultAction: 'link',
    coverImage: false,
    cardLayout: false,
    showMissingEpisodes: false,
    showSpecials: false,
    showDetailsMenu: true,
};

export function mergeDisplayOptions(
    opts: CardDisplayOptions
): Required<CardDisplayOptions> {
    return { ...DEFAULT_DISPLAY_OPTIONS, ...opts };
}

// ---------------------------------------------------------------------------
// Responsive column breakpoints
// ---------------------------------------------------------------------------

export type ColumnBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveColumns = Partial<Record<ColumnBreakpoint, number>>;

export const DEFAULT_PORTRAIT_COLUMNS: ResponsiveColumns = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
};

export const DEFAULT_LANDSCAPE_COLUMNS: ResponsiveColumns = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
};

export const DEFAULT_SQUARE_COLUMNS: ResponsiveColumns = {
    xs: 2,
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6,
};

export function getDefaultColumns(shape: CardShape): ResponsiveColumns {
    if (isPortraitShape(shape)) return DEFAULT_PORTRAIT_COLUMNS;
    if (isLandscapeShape(shape)) return DEFAULT_LANDSCAPE_COLUMNS;
    return DEFAULT_SQUARE_COLUMNS;
}

export function resolveColumnCount(
    columns: ResponsiveColumns,
    breakpoint: ColumnBreakpoint
): number {
    const order: ColumnBreakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const index = order.indexOf(breakpoint);
    for (let i = index; i >= 0; i--) {
        const bp = order[i];
        if (columns[bp] != null) return columns[bp] as number;
    }
    return 4;
}

// ---------------------------------------------------------------------------
// Focus / lazy loading helpers
// ---------------------------------------------------------------------------

export interface LazyCardState {
    isVisible: boolean
    isLoaded: boolean
    hasError: boolean
}

export const DEFAULT_LAZY_STATE: LazyCardState = {
    isVisible: false,
    isLoaded: false,
    hasError: false,
};

export function transitionLazyState(
    current: LazyCardState,
    event: 'visible' | 'loaded' | 'error' | 'reset'
): LazyCardState {
    switch (event) {
        case 'visible':
            return { ...current, isVisible: true };
        case 'loaded':
            return { ...current, isLoaded: true, hasError: false };
        case 'error':
            return { ...current, hasError: true };
        case 'reset':
            return DEFAULT_LAZY_STATE;
    }
}

// ---------------------------------------------------------------------------
// Card anchor / href helpers
// ---------------------------------------------------------------------------

const ITEM_TYPE_TO_ROUTE: Partial<Record<BaseItemKind, string>> = {
    Series: 'details',
    Season: 'details',
    Episode: 'details',
    Movie: 'details',
    BoxSet: 'details',
    MusicArtist: 'details',
    MusicAlbum: 'details',
    Playlist: 'details',
    Channel: 'livetv',
    Program: 'livetv',
};

export function getItemRoute(item: BaseItemDto): string {
    const kind = item.Type as BaseItemKind | undefined;
    const route = kind ? (ITEM_TYPE_TO_ROUTE[kind] ?? 'details') : 'details';
    return `/${route}?id=${item.Id ?? ''}`;
}

// ---------------------------------------------------------------------------
// Watched status helpers
// ---------------------------------------------------------------------------

export type WatchedStatus = 'played' | 'unplayed' | 'in-progress' | 'unknown';

export function getWatchedStatus(item: BaseItemDto): WatchedStatus {
    const userData = item.UserData;
    if (!userData) return 'unknown';
    if (userData.Played) return 'played';
    if (
        typeof userData.PlayedPercentage === 'number' &&
        userData.PlayedPercentage > 0
    ) {
        return 'in-progress';
    }
    return 'unplayed';
}

export function isWatched(item: BaseItemDto): boolean {
    return getWatchedStatus(item) === 'played';
}

export function isInProgress(item: BaseItemDto): boolean {
    return getWatchedStatus(item) === 'in-progress';
}

// ---------------------------------------------------------------------------
// Community rating helpers
// ---------------------------------------------------------------------------

export function formatCommunityRating(rating: number | null | undefined): string | null {
    if (rating == null || Number.isNaN(rating)) return null;
    return rating.toFixed(1);
}

export function getCriticRatingClass(rating: number | null | undefined): string {
    if (rating == null) return '';
    if (rating >= 60) return 'fresh';
    return 'rotten';
}

// ---------------------------------------------------------------------------
// ParentalRating / OfficialRating helpers
// ---------------------------------------------------------------------------

const MATURE_RATINGS: ReadonlySet<string> = new Set([
    'R', 'NC-17', 'X', 'AO', 'TV-MA', 'TV-14',
    '18', '18+', 'FSK 18', 'BBFC 18', 'MA15+', 'R18+',
]);

export function isMatureRating(officialRating: string | null | undefined): boolean {
    if (!officialRating) return false;
    return MATURE_RATINGS.has(officialRating.toUpperCase());
}

// ---------------------------------------------------------------------------
// Misc. guard helpers
// ---------------------------------------------------------------------------

export function hasBackdrop(item: BaseItemDto): boolean {
    return (
        (item.BackdropImageTags?.length ?? 0) > 0 ||
        item.ParentBackdropItemId != null
    );
}

export function hasPrimaryImage(item: BaseItemDto): boolean {
    return item.ImageTags?.['Primary'] != null || item.PrimaryImageTag != null;
}

export function hasThumbImage(item: BaseItemDto): boolean {
    return (
        item.ImageTags?.['Thumb'] != null ||
        item.SeriesThumbImageTag != null ||
        item.ParentThumbItemId != null
    );
}
