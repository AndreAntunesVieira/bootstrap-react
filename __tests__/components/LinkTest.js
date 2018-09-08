import React from 'react'
import { shallow } from 'enzyme'
import Link from 'components/commom/Link'

test('<Link/>', () => {
  const className = 'someClass'
  const target = '_blank'
  const children = 'Some text'
  const href = '/some-route'
  const wrapper = shallow(<Link target={target} href={href} className={className}>{children}</Link>)
  expect(wrapper.prop('route')).toEqual(href)
  expect(wrapper.find('a').hasClass('someClass')).toBeTruthy()
  expect(wrapper.find('a').prop('target')).toEqual(target)
  expect(wrapper.find('a').text()).toEqual(children)
})
