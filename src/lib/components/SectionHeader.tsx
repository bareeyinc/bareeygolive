/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface SectionHeaderProps {
  title: string;
  description: string;
  badge?: string;
}

export default function SectionHeader({ title, description, badge }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      {badge && (
        <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-black bg-gray-100 rounded-full uppercase mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2">
        {title}
      </h2>
      <p className="text-base text-gray-500 max-w-2xl">
        {description}
      </p>
    </div>
  );
}
