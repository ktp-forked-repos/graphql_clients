import React from 'react';

export default function ({search}) {
  return (
    <div>
      <input onBlur={search}/>
    </div>
  );
}