import React from 'react'
import { Link as NextLink } from 'pages/_routes'

export default function Link ({ href, ...props }) {
  return (
    <NextLink route={href}>
      <a {...props} />
    </NextLink>
  )
}
