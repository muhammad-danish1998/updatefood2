import axios from 'axios';
import React from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
const locationApi = navigator.geolocation;
const api_key = `AIzaSyCZ44yB_6Zqh9VSYqB6zhfPyxtK5hOwsL0`;
const usePostion = () => {
	const [formattedAddress, setFormattedAddress] = useState();
	const [address, setAddress] = useState();
	const [location, setLocation] = useState();

	useMemo(() => {
		if (!locationApi)
			throw Error(`Geolocation is not supported by your browser`);
		locationApi.getCurrentPosition((position) => {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);
	useMemo(() => {
		if (!location) return;
		const { latitude, longitude } = location || {};
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${api_key}`
		)
			.then((response) => response.json())
			.then((data) => {
				if (data.status === 'OK') {
					setFormattedAddress(data.results[0].formatted_address);
					// localStorage.setItem(
					// 	'your_street_name',
					// 	data.results[0].formatted_address
					// );
				}
			});
		axios
			.get(
				`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
			)
			.then((response) => {
				const address = response.data.address;
				setAddress(address);
			});
	}, [location]);
	return {
		address,
		formattedAddress,
		location,
	};
};

export default usePostion;
