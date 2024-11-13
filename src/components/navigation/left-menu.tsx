'use client'

import { Menu, MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link href={'/agro-registry'}>Registry</Link>,
    key: 'registry',
  },
  {
    label: <Link href={'/marketplace'}>Market Place</Link>,
    key: 'marketplace',
  },
  {
    label: <Link href={'/research'}>Research</Link>,
    key: 'research',
  },
  {
    label: <Link href={'/event'}>Event</Link>,
    key: 'event',
  },
 
]

import React, { useState } from 'react'

type Props = {
  mode: "horizontal" | "vertical" | "inline"
}

const Navbar = ({mode}: Props) => {
  const [current, setCurrent] = useState('mail');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode={mode} items={items} />
  )
}

export default Navbar