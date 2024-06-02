import React from 'react';

function formatDate(dateString) {
  const options = { year: '2-digit', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('ko-KR', options);
}

// 단순히 텍스트만 변환해주는 컴포넌트
const SimpleDateText = ({ dateString }) => {
  return <>{formatDate(dateString)}</>;
};

export default SimpleDateText;
