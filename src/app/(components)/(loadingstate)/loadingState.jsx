// src/utils/loadingState.js
let isLoadingData = true;

export const setLoadingData = (state) => {
  isLoadingData = state;
};

export const getLoadingData = () => {
  return isLoadingData;
};
