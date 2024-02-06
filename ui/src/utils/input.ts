import React from 'react';

export const getValueFromInputRef = (inputRef: React.RefObject<HTMLInputElement>): string => inputRef.current?.value || '';
