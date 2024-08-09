import React from 'react';
import { View } from 'react-native';
import SearchBar from './SearchBar';
import OrderSelector from './OrderSelector';

const ListHeader = React.memo(({ searchKeyword, setSearchKeyword, orderBy, orderDirection, setOrderBy, setOrderDirection }) => {
   return (
      <View>
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <OrderSelector
          orderBy={orderBy}
          orderDirection={orderDirection}
          setOrderBy={setOrderBy}
          setOrderDirection={setOrderDirection}
        />
      </View>
    );
})

export default ListHeader;