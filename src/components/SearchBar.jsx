import React from 'react'
import { View } from 'react-native'
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ searchKeyword, setSearchKeyword }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
    </View>
  )
}

export default SearchBar
