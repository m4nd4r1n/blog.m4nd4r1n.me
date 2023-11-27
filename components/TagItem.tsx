import Link from 'next/link'

interface TagItemProps {
  tag: string
  color: string
  isLink?: boolean
}

const colorVariants: Record<string, string> = Object.freeze({
  default: 'text-gray-600 bg-gray-200',
  gray: 'text-neutral-600 bg-neutral-200',
  brown: 'text-brown-600 bg-brown-200',
  orange: 'text-orange-600 bg-orange-200',
  yellow: 'text-yellow-600 bg-yellow-200',
  green: 'text-green-600 bg-green-200',
  blue: 'text-blue-600 bg-blue-200',
  purple: 'text-purple-600 bg-purple-200',
  pink: 'text-pink-600 bg-pink-200',
  red: 'text-red-600 bg-red-200'
})

const TagItem: React.FC<TagItemProps> = ({ tag, color, isLink = true }) => {
  const renderTag = () => (
    <p className={`mr-1 rounded-full px-2 py-1 text-sm leading-none ${colorVariants[color]}`}>
      {tag}
    </p>
  )
  return isLink ? <Link href={`/tag/${encodeURIComponent(tag)}`}>{renderTag()}</Link> : renderTag()
}

export default TagItem
