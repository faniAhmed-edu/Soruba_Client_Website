/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Lucide from "lucide-react";

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = "", size = 24 }: LucideIconProps) {
  const IconComponent = (Lucide as any)[name] || Lucide.Shield;
  return <IconComponent className={className} size={size} />;
}
