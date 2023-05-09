import Container from '../Container';
import React from 'react'
import { TbBeach } from 'react-icons/tb'
import { GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../ui/CategoryBox';

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This property is close to beach'
    },
    {
        label: 'Windmill',
        icon: GiWindmill,
        description: 'This property has windmills nearby'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This property is in modern style'
    },
]


const Categories = () => {
  return (
    <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            // selected={category === item.label}
          />
        ))}
        </div>
    </Container>
  )
}

export default Categories
