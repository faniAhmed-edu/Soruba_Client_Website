/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
// @ts-ignore
import logoImg from "../assets/soruba_logol.png";

interface SorubaLogoProps {
  className?: string;
  height?: number | string;
}

export default function SorubaLogo({ className = "", height = 80 }: SorubaLogoProps) {
  return (
    <img 
      src={logoImg} 
      alt="Soruba LLC Logo" 
      height={height}
      className={`h-auto w-auto max-w-full ${className}`} 
      style={{ height: height }}
    />
  );
}
