import { AvatarGroup,  Stack } from '@mui/material';
import React from 'react';
import { Avatar as Ava } from '@mui/material';
import { transeformImage } from '../../lib/features.js';

const AvatarCard1 = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction="row" spacing={0.5}>
      <AvatarGroup max={max}>
        {avatar.map((i, index) => (
          <Ava
            key={index}
            src={transeformImage(i)}
            alt={`Avatar ${index}`}
            style={{
              width: '3rem',
              height: '3rem',
              position: 'absolute',
              left: `${index * 3}rem`, // Adjust the spacing as needed
            }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard1;