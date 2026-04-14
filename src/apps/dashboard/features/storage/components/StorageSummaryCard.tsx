import type { FolderStorageDto } from '@jellyfin/sdk/lib/generated-client';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { type FC, useMemo } from 'react';

import globalize from 'lib/globalize';
import { getReadableSize } from 'utils/file';

import { calculateTotal, calculateUsedPercentage } from '../utils/space';
import StorageTypeIcon from './StorageTypeIcon';

interface StorageSummaryCardProps {
    label: string
    folders?: FolderStorageDto[]
    isLoading?: boolean
}

const CRITICAL_THRESHOLD = 90;
const WARNING_THRESHOLD = 80;

const getSeverityColor = (percent: number): 'error' | 'warning' | 'success' => {
    if (percent >= CRITICAL_THRESHOLD) return 'error';
    if (percent >= WARNING_THRESHOLD) return 'warning';
    return 'success';
};

const getSeverityLabel = (percent: number): string => {
    if (percent >= CRITICAL_THRESHOLD) return globalize.translate('StorageStatusCritical');
    if (percent >= WARNING_THRESHOLD) return globalize.translate('StorageStatusWarning');
    return globalize.translate('StorageStatusHealthy');
};

interface TotalsAccumulator {
    totalBytes: number
    usedBytes: number
    valid: boolean
}

const accumulateTotals = (folders: FolderStorageDto[]): TotalsAccumulator =>
    folders.reduce<TotalsAccumulator>(
        (acc, folder) => {
            const total = calculateTotal(folder);
            if (total < 0 || typeof folder.UsedSpace === 'undefined' || folder.UsedSpace < 0) {
                return { ...acc, valid: false };
            }
            return {
                totalBytes: acc.totalBytes + total,
                usedBytes: acc.usedBytes + folder.UsedSpace,
                valid: acc.valid
            };
        },
        { totalBytes: 0, usedBytes: 0, valid: true }
    );

const StorageSummaryCard: FC<StorageSummaryCardProps> = ({
    label,
    folders,
    isLoading = false
}) => {
    const totals = useMemo(() => {
        if (!folders || folders.length === 0) return null;
        return accumulateTotals(folders);
    }, [folders]);

    const overallPercent = useMemo(() => {
        if (!totals || !totals.valid || totals.totalBytes === 0) return 0;
        return Math.round((totals.usedBytes / totals.totalBytes) * 100);
    }, [totals]);

    const severityColor = getSeverityColor(overallPercent);
    const severityLabel = getSeverityLabel(overallPercent);

    if (isLoading) {
        return (
            <Card variant='outlined'>
                <CardHeader
                    title={<Skeleton width='40%' />}
                    subheader={<Skeleton width='20%' />}
                />
                <CardContent>
                    <Skeleton variant='rectangular' height={8} />
                    <Box mt={1}>
                        <Skeleton width='30%' />
                    </Box>
                </CardContent>
            </Card>
        );
    }

    if (!folders || folders.length === 0) {
        return (
            <Card variant='outlined'>
                <CardHeader title={label} />
                <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                        {globalize.translate('NoStorageLocationsConfigured')}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card variant='outlined'>
            <CardHeader
                avatar={<StorageTypeIcon type={folders[0]?.StorageType} />}
                title={label}
                action={
                    <Tooltip title={severityLabel}>
                        <Chip
                            label={`${overallPercent}%`}
                            color={severityColor}
                            size='small'
                        />
                    </Tooltip>
                }
                subheader={
                    totals?.valid
                        ? `${getReadableSize(totals.usedBytes)} / ${getReadableSize(totals.totalBytes)}`
                        : globalize.translate('StorageSizeUnknown')
                }
            />
            <CardContent>
                <LinearProgress
                    variant='determinate'
                    value={overallPercent}
                    color={severityColor}
                    sx={{ height: 8, borderRadius: 4 }}
                />
                <Divider sx={{ my: 1.5 }} />
                <Grid container spacing={1}>
                    {folders.map((folder, index) => {
                        const folderPercent = calculateUsedPercentage(folder);
                        const folderTotal = calculateTotal(folder);
                        const folderColor = getSeverityColor(folderPercent);

                        return (
                            <Grid item xs={12} sm={6} key={folder.Path ?? index}>
                                <Box>
                                    <Typography variant='caption' color='text.secondary' noWrap>
                                        {folder.Path ?? globalize.translate('UnknownPath')}
                                    </Typography>
                                    <LinearProgress
                                        variant='determinate'
                                        value={folderPercent}
                                        color={folderColor}
                                        sx={{ height: 4, borderRadius: 2, mt: 0.25 }}
                                    />
                                    <Typography variant='caption' color='text.secondary'>
                                        {folderTotal >= 0
                                            ? `${getReadableSize(folder.UsedSpace ?? 0)} / ${getReadableSize(folderTotal)}`
                                            : globalize.translate('StorageSizeUnknown')
                                        }
                                    </Typography>
                                </Box>
                            </Grid>
                        );
                    })}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default StorageSummaryCard;
