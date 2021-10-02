import React, { useMemo } from 'react'

export type DummyImageProps = {
  shape?: 'avatar' | 'image' | 'text'
  width?: number
  height?: number
  bgColor?: string
  fgColor?: string
  placeholder?: string
  fontFamily?: string
  style?: React.CSSProperties
  className?: string
  alt?: string
}

export const DummyImage = ({
  shape = 'text',
  width = 300,
  height = 300,
  bgColor = '#e5e5e5',
  fgColor = '#f9f9f9',
  placeholder = `${width} x ${height}`,
  fontFamily = 'sans-serif',
  style,
  className = 'dummy-img',
  alt = 'dummy-img'
}: DummyImageProps) => {
  const imageDataURI = useMemo(() => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.style.backgroundColor = bgColor
    svg.setAttribute('viewBox', '0 0 24 24')
    svg.setAttribute('width', `${width}`)
    svg.setAttribute('height', `${height}`)

    const child: SVGTextElement | SVGPathElement =
      shape === 'text'
        ? document.createElementNS('http://www.w3.org/2000/svg', 'text')
        : document.createElementNS('http://www.w3.org/2000/svg', 'path')

    child.setAttribute('fill', `${fgColor}`)

    switch (shape) {
      case 'text':
        child.setAttribute('font-size', '15%')
        child.setAttribute('font-family', `${fontFamily}`)
        child.setAttribute('x', `50%`)
        child.setAttribute('y', `50%`)
        child.setAttribute('dominant-baseline', `middle`)
        child.setAttribute('text-anchor', `middle`)
        child.appendChild(document.createTextNode(placeholder))
        break

      case 'image':
        child.setAttribute(
          'd',
          `M16.07,15.78H7.93c-0.37,0-0.68-0.3-0.68-0.68V8.9c0-0.37,0.3-0.68,0.68-0.68h8.14c0.37,0,0.68,0.3,0.68,0.68v6.2C16.75,15.47,16.44,15.78,16.07,15.78z M7.93,8.7c-0.11,0-0.2,0.09-0.2,0.2v6.2c0,0.11,0.09,0.2,0.2,0.2h8.14c0.11,0,0.2-0.09,0.2-0.2V8.9c0-0.11-0.09-0.2-0.2-0.2H7.93z M8.49,13.62l1.6-1.59l0.8,0.79l2.52-2.5l2.11,2.09v2.16H8.49V13.62z M10.41,10.32c0,0.52-0.42,0.95-0.95,0.95c-0.52,0-0.95-0.42-0.95-0.95s0.42-0.95,0.95-0.95C9.98,9.38,10.41,9.8,10.41,10.32z`
        )
        break

      case 'avatar':
        child.setAttribute(
          'd',
          `M11.94,11.94c1.44,0,2.53-1.2,2.53-2.53s-1.2-2.53-2.53-2.53s-2.53,1.2-2.53,2.53S10.5,11.94,11.94,11.94z M11.94,13.26c-1.68,0-5.05,0.84-5.05,2.53v1.32h10.22v-1.32C16.99,14.1,13.62,13.26,11.94,13.26z`
        )
        break

      default:
        break
    }

    svg.appendChild(child)

    // Convert SVG to data uri
    const serializedSVG = new XMLSerializer().serializeToString(svg)

    return `data:image/svg+xml;base64,${window.btoa(serializedSVG)}`
  }, [bgColor, fgColor, fontFamily, height, placeholder, shape, width])

  return (
    <img
      src={imageDataURI}
      style={{ maxWidth: '100%', height: 'auto', ...style }}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}