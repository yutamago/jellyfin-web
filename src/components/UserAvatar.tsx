import React, { type FC } from 'react';
import type { UserDto } from '@jellyfin/sdk/lib/generated-client/models/user-dto';
import Avatar from '@mui/material/Avatar';
import type {} from '@mui/material/themeCssVarsAugmentation';

import { useApi } from 'hooks/useApi';

interface UserAvatarProps {
    user?: UserDto
}

const UserAvatar: FC<UserAvatarProps> = ({ user }) => {
    const { api } = useApi();

    const ariaLabel = user?.Name
        ? `User avatar for ${user.Name}`
        : 'User avatar';

    return user ? (
        <Avatar
            aria-label={ariaLabel}
            alt={user.Name ?? undefined}
            src={
                api && user.Id && user.PrimaryImageTag ?
                    `${api.basePath}/Users/${user.Id}/Images/Primary?tag=${user.PrimaryImageTag}` :
                    undefined
            }
            // eslint-disable-next-line react/jsx-no-bind
            sx={(theme) => ({
                bgcolor: api && user.Id && user.PrimaryImageTag ?
                    theme.vars.palette.background.paper :
                    theme.vars.palette.primary.dark,
                color: 'inherit'
            })}
        />
    ) : null;
};

export default UserAvatar;
