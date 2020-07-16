/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import FILTER_QUERY from '../queries/filter'

const MySelect = dynamic(
  () => import('react-select'),
  { ssr: false }
)

const Filter = (props) => {
  const router = useRouter()
  const [categories, setCategories] = useState()
  const [colors, setcolors] = useState()
  const [platforms, setplatforms] = useState()

  const { loading, error, data } = useQuery(
    FILTER_QUERY
  )

  useEffect(() => {
    const onCompleted = (data) => {
      if (data && data.categories && data.colors && data.platforms) {

        const categories_option = [{ value: { uri: '/', id: '' }, label: 'All categories' }]
        const colors_option = [{ value: { uri: '/', id: '' }, label: 'All colors' }]
        const platforms_option = [{ value: { uri: '/', id: '' }, label: 'All platforms' }]

        data.categories.nodes.map((category) => {
          categories_option.push({ value: { uri: category.uri, id: category.id }, label: `${category.name}  (${category.count})` })
        })
        data.colors.nodes.map((color) => {
          colors_option.push({ value: { uri: color.uri, id: color.id }, label: color.name })
        })
        data.platforms.nodes.map((platform) => {
          platforms_option.push({ value: { uri: platform.uri, id: platform.id }, label: platform.name })
        })

        setCategories(categories_option)
        setcolors(colors_option)
        setplatforms(platforms_option)
      }
    }
    const onError = (error) => {
      return <div>{error}</div>
    }
    if (onCompleted || onError) {
      if (onCompleted && !loading && !error) {
        onCompleted(data)
      } else if (onError && !loading && error) {
        onError(error)
      }
    }
  }, [data])

  const handleChange = (selectedOption) => {
    router.push(`${selectedOption.value.uri}${selectedOption.value.id}`)
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-wrap mb-4">
        <div className="w-1/2 md:w-1/4 lg:w-1/4 fl-item px-3">
          <span className="text-base">Select Categories</span>
          <MySelect options={categories} className="mt-1" onChange={handleChange} placeholder="All categories"/>
        </div>
        <div className="w-1/2 md:w-1/4 lg:w-1/4 fl-item px-3">
          <span className="text-base">Colors</span>
          <MySelect options={colors} className="mt-1" onChange={handleChange} placeholder="All colors"/>
        </div>
        <div className="w-1/2 md:w-1/4 lg:w-1/4 fl-item px-3">
          <span className="text-base">Platform</span>
          <MySelect options={platforms} className="mt-1" onChange={handleChange} placeholder="All platforms"/>
        </div>
      </div>
      <hr></hr>
    </div>
  )
}

export default Filter
