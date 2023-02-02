import React from 'react';

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonsCardCharacter() {
  return (
    <div className='shadow m-5'>
      <Skeleton height={150} />
      <Skeleton count={2} />
    </div>
  )
}

export default SkeletonsCardCharacter;