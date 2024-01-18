import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {searchAutocomplete, setQuery} from '../../redux/slices/searchSlice';
import Autocomplete from 'react-native-autocomplete-input';
import {AppDispatch, RootState} from "../../redux/store";
import {AutocompleteItem} from "../../types/searchTypes";
import {Text, View, View as ThemedView} from '../../components/Themed';
import {StyleSheet} from 'react-native';
import {SafeAreaThemed} from "./SafeAreaThemed";

export const AutocompleteInput = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {query, suggestions} = useSelector((state: RootState) => state.search);

    const handleChangeText = (text: string) => {
        dispatch(setQuery(text));
        // Fetch suggestions from the backend here and dispatch them
    };

    // Fetch suggestions when the query changes
    useEffect(() => {
        dispatch(searchAutocomplete(query));
    }, [query]);

    return (
        <Autocomplete
            data={suggestions}
            value={query}
            onChangeText={handleChangeText}
            flatListProps={{
                renderItem: ({item}: { item: AutocompleteItem }) => (
                    <Text>{item.name}</Text>
                ),
                keyExtractor: (item: AutocompleteItem, index: number) => index.toString(),
            }}
        />
    );
};