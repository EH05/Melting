import { SVGIconProps } from '@/types/globalType'

export default function Play({
  width = 32,
  height = 32,
  fill = '#A5A5A5',
}: SVGIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.15516 15.5017C5.96327 15.5013 5.77477 15.451 5.60821 15.3557C5.23316 15.1432 5 14.7306 5 14.2827V5.21898C5 4.76985 5.23316 4.35854 5.60821 4.14601C5.77873 4.04801 5.97245 3.99761 6.16912 4.00009C6.36578 4.00256 6.55817 4.05782 6.72618 4.16008L14.4726 8.79697C14.634 8.8982 14.7671 9.03878 14.8594 9.20551C14.9516 9.37224 15 9.55968 15 9.75023C15 9.94079 14.9516 10.1282 14.8594 10.295C14.7671 10.4617 14.634 10.6023 14.4726 10.7035L6.72493 15.3416C6.553 15.4456 6.35607 15.5009 6.15516 15.5017Z"
        fill={fill}
      />
    </svg>
  )
}
