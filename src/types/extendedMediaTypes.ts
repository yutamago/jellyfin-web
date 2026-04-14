/**
 * Extended TypeScript type definitions for media item API responses.
 *
 * Provides strongly-typed wrappers and discriminated unions for the
 * subset of Jellyfin API response shapes used across the web client.
 */

import type { BaseItemDto } from '@jellyfin/sdk/lib/generated-client/models/base-item-dto';
import type { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import type { MediaType } from '@jellyfin/sdk/lib/generated-client/models/media-type';
import type { VideoType } from '@jellyfin/sdk/lib/generated-client/models/video-type';
import type { ImageType } from '@jellyfin/sdk/lib/generated-client/models/image-type';

export type SeriesId = string & { readonly __brand: 'SeriesId' };
export type SeasonId = string & { readonly __brand: 'SeasonId' };
export type EpisodeId = string & { readonly __brand: 'EpisodeId' };
export type MovieId = string & { readonly __brand: 'MovieId' };
export type MusicAlbumId = string & { readonly __brand: 'MusicAlbumId' };
export type MusicArtistId = string & { readonly __brand: 'MusicArtistId' };
export type AudioId = string & { readonly __brand: 'AudioId' };
export type BookId = string & { readonly __brand: 'BookId' };
export type PhotoId = string & { readonly __brand: 'PhotoId' };
export type PlaylistId = string & { readonly __brand: 'PlaylistId' };
export type BoxSetId = string & { readonly __brand: 'BoxSetId' };
export type ChannelId = string & { readonly __brand: 'ChannelId' };
export type ProgramId = string & { readonly __brand: 'ProgramId' };
export type LiveTvProgramId = string & { readonly __brand: 'LiveTvProgramId' };
export type CollectionFolderId = string & { readonly __brand: 'CollectionFolderId' };
export type UserViewId = string & { readonly __brand: 'UserViewId' };
export type FolderId = string & { readonly __brand: 'FolderId' };

// ---------------------------------------------------------------------------
// Discriminated union item types
// ---------------------------------------------------------------------------

export interface MovieItem extends BaseItemDto {
    readonly Type: 'Movie';
}

export interface SeriesItem extends BaseItemDto {
    readonly Type: 'Series';
}

export interface SeasonItem extends BaseItemDto {
    readonly Type: 'Season';
}

export interface EpisodeItem extends BaseItemDto {
    readonly Type: 'Episode';
}

export interface MusicAlbumItem extends BaseItemDto {
    readonly Type: 'MusicAlbum';
}

export interface MusicArtistItem extends BaseItemDto {
    readonly Type: 'MusicArtist';
}

export interface AudioItem extends BaseItemDto {
    readonly Type: 'Audio';
}

export interface BookItem extends BaseItemDto {
    readonly Type: 'Book';
}

export interface PhotoItem extends BaseItemDto {
    readonly Type: 'Photo';
}

export interface PhotoAlbumItem extends BaseItemDto {
    readonly Type: 'PhotoAlbum';
}

export interface MusicVideoItem extends BaseItemDto {
    readonly Type: 'MusicVideo';
}

export interface TrailerItem extends BaseItemDto {
    readonly Type: 'Trailer';
}

export interface BoxSetItem extends BaseItemDto {
    readonly Type: 'BoxSet';
}

export interface PlaylistItem extends BaseItemDto {
    readonly Type: 'Playlist';
}

export interface CollectionFolderItem extends BaseItemDto {
    readonly Type: 'CollectionFolder';
}

export interface UserViewItem extends BaseItemDto {
    readonly Type: 'UserView';
}

export interface ChannelItem extends BaseItemDto {
    readonly Type: 'Channel';
}

export interface ProgramItem extends BaseItemDto {
    readonly Type: 'Program';
}

export interface LiveTvProgramItem extends BaseItemDto {
    readonly Type: 'LiveTvProgram';
}

export interface TvChannelItem extends BaseItemDto {
    readonly Type: 'TvChannel';
}

export interface GenreItem extends BaseItemDto {
    readonly Type: 'Genre';
}

export interface MusicGenreItem extends BaseItemDto {
    readonly Type: 'MusicGenre';
}

export interface StudioItem extends BaseItemDto {
    readonly Type: 'Studio';
}

export interface PersonItem extends BaseItemDto {
    readonly Type: 'Person';
}

export interface FolderItem extends BaseItemDto {
    readonly Type: 'Folder';
}

export interface AggregateFolderItem extends BaseItemDto {
    readonly Type: 'AggregateFolder';
}

export type MediaItem =
    | MovieItem
    | SeriesItem
    | SeasonItem
    | EpisodeItem
    | MusicAlbumItem
    | MusicArtistItem
    | AudioItem
    | BookItem
    | PhotoItem
    | MusicVideoItem
    | TrailerItem
    | BoxSetItem
    | PlaylistItem;

export type LibraryItem =
    | CollectionFolderItem
    | UserViewItem
    | FolderItem
    | AggregateFolderItem;

// ---------------------------------------------------------------------------
// Runtime type guards
// ---------------------------------------------------------------------------

export function isMovie(item: BaseItemDto): item is MovieItem {
    return item.Type === 'Movie';
}

export function isSeries(item: BaseItemDto): item is SeriesItem {
    return item.Type === 'Series';
}

export function isSeason(item: BaseItemDto): item is SeasonItem {
    return item.Type === 'Season';
}

export function isEpisode(item: BaseItemDto): item is EpisodeItem {
    return item.Type === 'Episode';
}

export function isMusicAlbum(item: BaseItemDto): item is MusicAlbumItem {
    return item.Type === 'MusicAlbum';
}

export function isMusicArtist(item: BaseItemDto): item is MusicArtistItem {
    return item.Type === 'MusicArtist';
}

export function isAudio(item: BaseItemDto): item is AudioItem {
    return item.Type === 'Audio';
}

export function isBook(item: BaseItemDto): item is BookItem {
    return item.Type === 'Book';
}

export function isPhoto(item: BaseItemDto): item is PhotoItem {
    return item.Type === 'Photo';
}

export function isMusicVideo(item: BaseItemDto): item is MusicVideoItem {
    return item.Type === 'MusicVideo';
}

export function isTrailer(item: BaseItemDto): item is TrailerItem {
    return item.Type === 'Trailer';
}

export function isBoxSet(item: BaseItemDto): item is BoxSetItem {
    return item.Type === 'BoxSet';
}

export function isPlaylist(item: BaseItemDto): item is PlaylistItem {
    return item.Type === 'Playlist';
}

export function isCollectionFolder(item: BaseItemDto): item is CollectionFolderItem {
    return item.Type === 'CollectionFolder';
}

export function isUserView(item: BaseItemDto): item is UserViewItem {
    return item.Type === 'UserView';
}

export function isChannel(item: BaseItemDto): item is ChannelItem {
    return item.Type === 'Channel';
}

export function isProgram(item: BaseItemDto): item is ProgramItem {
    return item.Type === 'Program';
}

// ---------------------------------------------------------------------------
// Image tag map helpers
// ---------------------------------------------------------------------------

export type ImageTagMap = Partial<Record<ImageType, string>>;

export function getImageTag(
    item: BaseItemDto,
    type: ImageType = 'Primary' as ImageType
): string | undefined {
    return item.ImageTags?.[type as string] ?? undefined;
}

export function hasImageType(item: BaseItemDto, type: ImageType): boolean {
    return item.ImageTags?.[type as string] != null;
}

export function listAvailableImageTypes(item: BaseItemDto): ImageType[] {
    return Object.keys(item.ImageTags ?? {}) as ImageType[];
}

// ---------------------------------------------------------------------------
// Media stream narrow types
// ---------------------------------------------------------------------------

export type StreamType = 'Audio' | 'Video' | 'Subtitle' | 'EmbeddedImage' | 'Data' | 'Lyric';

export interface VideoStreamInfo {
    readonly streamType: Extract<StreamType, "Video">;
    readonly codec: string | null | undefined;
    readonly width: number | null | undefined;
    readonly height: number | null | undefined;
    readonly bitRate: number | null | undefined;
    readonly frameRate: number | null | undefined;
    readonly videoRange: string | null | undefined;
    readonly colorSpace: string | null | undefined;
    readonly isDefault: boolean;
}

export interface AudioStreamInfo {
    readonly streamType: Extract<StreamType, "Audio">;
    readonly codec: string | null | undefined;
    readonly channelLayout: string | null | undefined;
    readonly channels: number | null | undefined;
    readonly sampleRate: number | null | undefined;
    readonly bitRate: number | null | undefined;
    readonly language: string | null | undefined;
    readonly isDefault: boolean;
    readonly isForced: boolean;
}

export interface SubtitleStreamInfo {
    readonly streamType: Extract<StreamType, "Subtitle">;
    readonly codec: string | null | undefined;
    readonly language: string | null | undefined;
    readonly displayTitle: string | null | undefined;
    readonly isDefault: boolean;
    readonly isForced: boolean;
    readonly isExternal: boolean;
    readonly supportsExternalStream: boolean;
}

export type MediaStreamInfo = VideoStreamInfo | AudioStreamInfo | SubtitleStreamInfo;

// ---------------------------------------------------------------------------
// UserData narrow types
// ---------------------------------------------------------------------------

export interface ExtendedUserData {
    readonly rating: number | null | undefined;
    readonly playedPercentage: number | null | undefined;
    readonly unplayedItemCount: number | null | undefined;
    readonly playbackPositionTicks: number | null | undefined;
    readonly playCount: number;
    readonly isFavorite: boolean;
    readonly likes: boolean | null | undefined;
    readonly lastPlayedDate: string | null | undefined;
    readonly played: boolean;
    readonly key: string;
    readonly itemId: string | null | undefined;
}

export function toExtendedUserData(
    raw: BaseItemDto["UserData"]
): ExtendedUserData | null {
    if (!raw) return null;
    return {
        rating: raw.Rating ?? null,
        playedPercentage: raw.PlayedPercentage ?? null,
        unplayedItemCount: raw.UnplayedItemCount ?? null,
        playbackPositionTicks: raw.PlaybackPositionTicks ?? null,
        playCount: raw.PlayCount ?? 0,
        isFavorite: raw.IsFavorite ?? false,
        likes: raw.Likes ?? null,
        lastPlayedDate: raw.LastPlayedDate ?? null,
        played: raw.Played ?? false,
        key: raw.Key ?? "",
        itemId: raw.ItemId ?? null,
    };
}

// ---------------------------------------------------------------------------
// Video type helpers
// ---------------------------------------------------------------------------

export const VIDEO_TYPES: readonly VideoType[] = [
    'VideoFile' as VideoType,
    'Iso' as VideoType,
    'Dvd' as VideoType,
    'BluRay' as VideoType,
];

export function isVideoFileVideoType(item: BaseItemDto): boolean {
    return item.VideoType === 'VideoFile' as VideoType;
}

export function isIsoVideoType(item: BaseItemDto): boolean {
    return item.VideoType === 'Iso' as VideoType;
}

export function isDvdVideoType(item: BaseItemDto): boolean {
    return item.VideoType === 'Dvd' as VideoType;
}

export function isBluRayVideoType(item: BaseItemDto): boolean {
    return item.VideoType === 'BluRay' as VideoType;
}

// ---------------------------------------------------------------------------
// Media type helpers
// ---------------------------------------------------------------------------

export function isUnknownMediaType(item: BaseItemDto): boolean {
    return item.MediaType === 'Unknown' as MediaType;
}

export function isVideoMediaType(item: BaseItemDto): boolean {
    return item.MediaType === 'Video' as MediaType;
}

export function isAudioMediaType(item: BaseItemDto): boolean {
    return item.MediaType === 'Audio' as MediaType;
}

export function isPhotoMediaType(item: BaseItemDto): boolean {
    return item.MediaType === 'Photo' as MediaType;
}

export function isBookMediaType(item: BaseItemDto): boolean {
    return item.MediaType === 'Book' as MediaType;
}

// ---------------------------------------------------------------------------
// Nullable field accessors (avoid optional chaining verbosity at call sites)
// ---------------------------------------------------------------------------

export function getName(item: BaseItemDto): string | null {
    return item.Name ?? null;
}

export function getOverview(item: BaseItemDto): string | null {
    return item.Overview ?? null;
}

export function getTaglines(item: BaseItemDto): string[] | null {
    return item.Taglines ?? [];
}

export function getGenres(item: BaseItemDto): string[] | null {
    return item.Genres ?? [];
}

export function getStudios(item: BaseItemDto): string[] | null {
    return item.Studios ?? [];
}

export function getTags(item: BaseItemDto): string[] | null {
    return item.Tags ?? [];
}

export function getProductionYear(item: BaseItemDto): number | null {
    return item.ProductionYear ?? null;
}

export function getPremiereDate(item: BaseItemDto): string | null {
    return item.PremiereDate ?? null;
}

export function getOfficialRating(item: BaseItemDto): string | null {
    return item.OfficialRating ?? null;
}

export function getCustomRating(item: BaseItemDto): string | null {
    return item.CustomRating ?? null;
}

export function getCommunityRating(item: BaseItemDto): number | null {
    return item.CommunityRating ?? null;
}

export function getCriticRating(item: BaseItemDto): number | null {
    return item.CriticRating ?? null;
}

export function getRunTimeTicks(item: BaseItemDto): number | null {
    return item.RunTimeTicks ?? null;
}

export function getEndDate(item: BaseItemDto): string | null {
    return item.EndDate ?? null;
}

export function getSeriesName(item: BaseItemDto): string | null {
    return item.SeriesName ?? null;
}

export function getSeasonName(item: BaseItemDto): string | null {
    return item.SeasonName ?? null;
}

export function getAlbumArtist(item: BaseItemDto): string | null {
    return item.AlbumArtist ?? null;
}

export function getAlbum(item: BaseItemDto): string | null {
    return item.Album ?? null;
}

// ---------------------------------------------------------------------------
// Chapter info helpers
// ---------------------------------------------------------------------------

export interface ChapterMarker {
    readonly index: number;
    readonly name: string | null | undefined;
    readonly startPositionTicks: number;
    readonly imagePath: string | null | undefined;
}

export function normaliseChapters(item: BaseItemDto): ChapterMarker[] {
    return (item.Chapters ?? []).map((ch, i) => ({
        index: i,
        name: ch.Name ?? null,
        startPositionTicks: ch.StartPositionTicks ?? 0,
        imagePath: ch.ImagePath ?? null,
    }));
}

// ---------------------------------------------------------------------------
// External URL helpers
// ---------------------------------------------------------------------------

export interface ExternalLink {
    readonly name: string;
    readonly url: string;
}

export function getExternalLinks(item: BaseItemDto): ExternalLink[] {
    return (item.ExternalUrls ?? []).flatMap(u => {
        if (!u.Url) return [];
        return [{ name: u.Name ?? u.Url, url: u.Url }];
    });
}

// ---------------------------------------------------------------------------
// Provider ID helpers
// ---------------------------------------------------------------------------

export function getImdbId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['imdb'] ?? null;
}

export function getTmdbId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['tmdb'] ?? null;
}

export function getTvdbId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['tvdb'] ?? null;
}

export function getMusicbrainzId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['musicbrainz'] ?? null;
}

export function getTheaudiodbId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['theaudiodb'] ?? null;
}

export function getAnidbId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['anidb'] ?? null;
}

export function getAnilistId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['anilist'] ?? null;
}

export function getMalId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['mal'] ?? null;
}

export function getZap2itId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['zap2it'] ?? null;
}

export function getTvrageId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['tvrage'] ?? null;
}

export function getAudioDBId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['audioDB'] ?? null;
}

export function getOpenLibraryId(item: BaseItemDto): string | null {
    return item.ProviderIds?.['openLibrary'] ?? null;
}

// ---------------------------------------------------------------------------
// Tag and genre helpers
// ---------------------------------------------------------------------------

export function hasTag(item: BaseItemDto, tag: string): boolean {
    return (item.Tags ?? []).some(t => t.toLowerCase() === tag.toLowerCase());
}

export function hasGenre(item: BaseItemDto, genre: string): boolean {
    return (item.Genres ?? []).some(g => g.toLowerCase() === genre.toLowerCase());
}

export function getTagsLowerCase(item: BaseItemDto): string[] {
    return (item.Tags ?? []).map(t => t.toLowerCase());
}

// ---------------------------------------------------------------------------
// Collection type helpers
// ---------------------------------------------------------------------------

export function isMoviesLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'movies';
}

export function isTvshowsLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'tvshows';
}

export function isMusicLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'music';
}

export function isMusicvideosLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'musicvideos';
}

export function isBooksLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'books';
}

export function isPhotosLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'photos';
}

export function isHomevideosLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'homevideos';
}

export function isBoxsetsLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'boxsets';
}

export function isLivetvLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'livetv';
}

export function isPlaylistsLibrary(item: BaseItemDto): boolean {
    return item.CollectionType === 'playlists';
}

// ---------------------------------------------------------------------------
// Sort key helpers
// ---------------------------------------------------------------------------

export function getSortName(item: BaseItemDto): string {
    return item.SortName ?? item.ForcedSortOrder ?? item.Name ?? "";
}

export function compareByName(a: BaseItemDto, b: BaseItemDto): number {
    return getSortName(a).localeCompare(getSortName(b));
}

export function compareByYear(a: BaseItemDto, b: BaseItemDto): number {
    return (a.ProductionYear ?? 0) - (b.ProductionYear ?? 0);
}

export function compareByRating(a: BaseItemDto, b: BaseItemDto): number {
    return (b.CommunityRating ?? 0) - (a.CommunityRating ?? 0);
}

export function compareByDateAdded(a: BaseItemDto, b: BaseItemDto): number {
    const da = a.DateCreated ? new Date(a.DateCreated).getTime() : 0;
    const db = b.DateCreated ? new Date(b.DateCreated).getTime() : 0;
    return db - da;
}

// ---------------------------------------------------------------------------
// Misc field helpers
// ---------------------------------------------------------------------------

export function getIsHD(item: BaseItemDto): boolean {
    return item.IsHD === true;
}

export function getIs4K(item: BaseItemDto): boolean {
    return item.Is4K === true;
}

export function getIs3D(item: BaseItemDto): boolean {
    return item.Is3D === true;
}

export function getIsHdr(item: BaseItemDto): boolean {
    return item.IsHdr === true;
}

export function getIsVr(item: BaseItemDto): boolean {
    return item.IsVr === true;
}

export function getHasSubtitles(item: BaseItemDto): boolean {
    return item.HasSubtitles === true;
}

export function getIsPlaceHolder(item: BaseItemDto): boolean {
    return item.IsPlaceHolder === true;
}

export function getIndexNumber(item: BaseItemDto): number | null {
    return item.IndexNumber ?? null;
}

export function getParentIndexNumber(item: BaseItemDto): number | null {
    return item.ParentIndexNumber ?? null;
}

export function getEpisodeLabel(item: BaseItemDto): string | null {
    if (!isEpisodeItem(item)) return null;
    const s = item.ParentIndexNumber;
    const e = item.IndexNumber;
    if (s == null || e == null) return null;
    return `S${String(s).padStart(2, "0")}E${String(e).padStart(2, "0")}`;
}

function isEpisodeItem(item: BaseItemDto): boolean {
    return item.Type === 'Episode';
}

// ---------------------------------------------------------------------------
// Playback info helpers
// ---------------------------------------------------------------------------

export interface PlaybackCandidate {
    readonly id: string;
    readonly name: string | null | undefined;
    readonly mediaType: string | null | undefined;
    readonly runTimeTicks: number | null | undefined;
    readonly canResume: boolean;
    readonly resumePositionTicks: number | null | undefined;
}

export function toPlaybackCandidate(item: BaseItemDto): PlaybackCandidate | null {
    if (!item.Id) return null;
    return {
        id: item.Id,
        name: item.Name ?? null,
        mediaType: item.MediaType ?? null,
        runTimeTicks: item.RunTimeTicks ?? null,
        canResume: (item.UserData?.PlaybackPositionTicks ?? 0) > 0,
        resumePositionTicks: item.UserData?.PlaybackPositionTicks ?? null,
    };
}

// ---------------------------------------------------------------------------
// Batch conversion helpers
// ---------------------------------------------------------------------------

export function batchToPlaybackCandidates(items: BaseItemDto[]): PlaybackCandidate[] {
    return items.flatMap(item => {
        const c = toPlaybackCandidate(item);
        return c ? [c] : [];
    });
}

export function filterPlayable(items: BaseItemDto[]): BaseItemDto[] {
    return items.filter(i => i.MediaType === 'Video' || i.MediaType === 'Audio');
}

export function filterWatched(items: BaseItemDto[]): BaseItemDto[] {
    return items.filter(i => i.UserData?.Played === true);
}

export function filterUnwatched(items: BaseItemDto[]): BaseItemDto[] {
    return items.filter(i => i.UserData?.Played === false);
}

export function filterInProgress(items: BaseItemDto[]): BaseItemDto[] {
    return items.filter(i => {
        const pct = i.UserData?.PlayedPercentage ?? 0;
        return pct > 0 && pct < 100;
    });
}

export function filterFavorites(items: BaseItemDto[]): BaseItemDto[] {
    return items.filter(i => i.UserData?.IsFavorite === true);
}

// ---------------------------------------------------------------------------
// Index partition helpers (used by home sections)
// ---------------------------------------------------------------------------

export function partitionByKind<K extends BaseItemKind>(
    items: BaseItemDto[],
    kind: K
): BaseItemDto[] {
    return items.filter(i => i.Type === kind);
}

export function groupByKind(items: BaseItemDto[]): Map<string, BaseItemDto[]> {
    const map = new Map<string, BaseItemDto[]>();
    for (const item of items) {
        const key = item.Type ?? "Unknown";
        const group = map.get(key) ?? [];
        group.push(item);
        map.set(key, group);
    }
    return map;
}

export function groupByGenre(items: BaseItemDto[]): Map<string, BaseItemDto[]> {
    const map = new Map<string, BaseItemDto[]>();
    for (const item of items) {
        for (const genre of item.Genres ?? []) {
            const group = map.get(genre) ?? [];
            group.push(item);
            map.set(genre, group);
        }
    }
    return map;
}

export function groupByYear(items: BaseItemDto[]): Map<number, BaseItemDto[]> {
    const map = new Map<number, BaseItemDto[]>();
    for (const item of items) {
        const year = item.ProductionYear ?? 0;
        const group = map.get(year) ?? [];
        group.push(item);
        map.set(year, group);
    }
    return map;
}

// ---------------------------------------------------------------------------
// Resolution detection helpers
// ---------------------------------------------------------------------------

export type VideoResolutionClass = "4K" | "1080p" | "720p" | "SD" | "Unknown";

export function classifyResolution(
    width: number | null | undefined,
    height: number | null | undefined
): VideoResolutionClass {
    if (width == null || height == null) return "Unknown";
    const h = height;
    if (h >= 2160) return "4K";
    if (h >= 1080) return "1080p";
    if (h >= 720) return "720p";
    return "SD";
}

export function getResolutionClass(item: BaseItemDto): VideoResolutionClass {
    const streams = item.MediaStreams ?? [];
    const video = streams.find(s => s.Type === "Video");
    return classifyResolution(video?.Width, video?.Height);
}

// ---------------------------------------------------------------------------
// Codec helpers
// ---------------------------------------------------------------------------

export const HDR_VIDEO_RANGES: ReadonlySet<string> = new Set(['HDR', 'HDR10', 'HDR10+', 'HLG', 'DV', 'DoVi']);

export function isHdrItem(item: BaseItemDto): boolean {
    const streams = item.MediaStreams ?? [];
    return streams.some(s => {
        const range = s.VideoRange ?? "";
        return HDR_VIDEO_RANGES.has(range.toUpperCase());
    });
}

export const LOSSLESS_AUDIO_CODECS: ReadonlySet<string> = new Set([
    'flac', 'alac', 'ape', 'wav', 'aiff', 'truehd', 'dts-hd ma',
]);

export function hasLosslessAudio(item: BaseItemDto): boolean {
    const streams = item.MediaStreams ?? [];
    return streams.some(s => {
        const codec = (s.Codec ?? "").toLowerCase();
        return LOSSLESS_AUDIO_CODECS.has(codec);
    });
}

// ---------------------------------------------------------------------------
// Artist / album helpers
// ---------------------------------------------------------------------------

export function getArtistNames(item: BaseItemDto): string[] {
    return item.ArtistItems?.map(a => a.Name ?? "").filter(Boolean) ?? item.Artists ?? [];
}

export function getPrimaryArtistName(item: BaseItemDto): string | null {
    return getArtistNames(item)[0] ?? null;
}

export function getAlbumArtistName(item: BaseItemDto): string | null {
    return item.AlbumArtist ?? null;
}

// ---------------------------------------------------------------------------
// Person helpers
// ---------------------------------------------------------------------------

export type PersonRole = 'Actor' | 'Director' | 'Producer' | 'Writer' | 'GuestStar' | 'Composer';

export interface CastMember {
    readonly id: string | null | undefined;
    readonly name: string;
    readonly role: PersonRole | string;
    readonly order: number;
    readonly primaryImageTag: string | null | undefined;
}

export function getCastMembers(item: BaseItemDto, maxCount = 10): CastMember[] {
    return (item.People ?? [])
        .filter(p => p.Name)
        .slice(0, maxCount)
        .map((p, i) => ({
            id: p.Id ?? null,
            name: p.Name!,
            role: (p.Type ?? "Actor") as PersonRole | string,
            order: p.SortOrder ?? i,
            primaryImageTag: p.PrimaryImageTag ?? null,
        }));
}

export function getDirectors(item: BaseItemDto): CastMember[] {
    return getCastMembers(item, 50).filter(m => m.role === 'Director');
}

export function getWriters(item: BaseItemDto): CastMember[] {
    return getCastMembers(item, 50).filter(m => m.role === 'Writer');
}

// ---------------------------------------------------------------------------
// Live TV helpers
// ---------------------------------------------------------------------------

export function isCurrentlyAiring(item: BaseItemDto): boolean {
    const start = item.StartDate ? new Date(item.StartDate).getTime() : null;
    const end = item.EndDate ? new Date(item.EndDate).getTime() : null;
    if (start == null || end == null) return false;
    const now = Date.now();
    return now >= start && now <= end;
}

export function getAiringProgress(item: BaseItemDto): number | null {
    const start = item.StartDate ? new Date(item.StartDate).getTime() : null;
    const end = item.EndDate ? new Date(item.EndDate).getTime() : null;
    if (start == null || end == null) return null;
    const duration = end - start;
    if (duration <= 0) return null;
    return Math.min(100, Math.max(0, ((Date.now() - start) / duration) * 100));
}
// ---------------------------------------------------------------------------
// Download / transcode helpers
// ---------------------------------------------------------------------------

export interface DownloadLink {
    readonly url: string;
    readonly label: string;
    readonly isTranscoded: boolean;
}

export function getDirectPlayUrl(basePath: string, item: BaseItemDto): string | null {
    if (!item.Id) return null;
    return `${basePath}/Items/${item.Id}/Download`;
}

// ---------------------------------------------------------------------------
// Series resume helpers
// ---------------------------------------------------------------------------

export function getNextUpEpisodeLabel(episode: BaseItemDto): string {
    const s = episode.ParentIndexNumber;
    const e = episode.IndexNumber;
    if (s == null || e == null) return episode.Name ?? "";
    return `S${String(s).padStart(2, "0")}E${String(e).padStart(2, "0")} - ${episode.Name ?? ""}`;
}

export function getResumeLabel(item: BaseItemDto): string | null {
    const ticks = item.UserData?.PlaybackPositionTicks;
    if (!ticks || ticks <= 0) return null;
    const totalMinutes = Math.floor(ticks / 600_000_000);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ---------------------------------------------------------------------------
// Utility: deep-equal check for BaseItemDto identity
// ---------------------------------------------------------------------------

export function isSameItem(a: BaseItemDto, b: BaseItemDto): boolean {
    return a.Id != null && a.Id === b.Id;
}

export function deduplicateItems(items: BaseItemDto[]): BaseItemDto[] {
    const seen = new Set<string>();
    return items.filter(item => {
        if (!item.Id) return true;
        if (seen.has(item.Id)) return false;
        seen.add(item.Id);
        return true;
    });
}

// ---------------------------------------------------------------------------
// Network path helpers
// ---------------------------------------------------------------------------

export function buildImageUrl(
    basePath: string,
    itemId: string,
    imageType: ImageType,
    tag: string,
    opts: { width?: number; height?: number; quality?: number } = {}
): string {
    const params = new URLSearchParams({ tag });
    if (opts.width) params.set("maxWidth", String(opts.width));
    if (opts.height) params.set("maxHeight", String(opts.height));
    if (opts.quality) params.set("quality", String(opts.quality));
    return `${basePath}/Items/${itemId}/Images/${imageType}?${params.toString()}`;
}

export function buildUserImageUrl(
    basePath: string,
    userId: string,
    tag: string
): string {
    return `${basePath}/Users/${userId}/Images/Primary?tag=${encodeURIComponent(tag)}`;
}

// ---------------------------------------------------------------------------
// Type predicate helpers for union narrowing
// ---------------------------------------------------------------------------

export type PlayableItem = Extract<MediaItem, { MediaType: 'Video' | 'Audio' }>;

export function isPlayableItem(item: BaseItemDto): boolean {
    return item.MediaType === 'Video' || item.MediaType === 'Audio';
}

export function isFolderItem(item: BaseItemDto): boolean {
    return item.IsFolder === true;
}

export function isLiveTvItem(item: BaseItemDto): boolean {
    return item.Type === 'Program' || item.Type === 'LiveTvProgram' || item.Type === 'TvChannel';
}

export function isCollectionItem(item: BaseItemDto): boolean {
    return item.Type === 'BoxSet' || item.Type === 'Playlist' || item.Type === 'CollectionFolder';
}

// ---------------------------------------------------------------------------
// End of extendedMediaTypes
// ---------------------------------------------------------------------------