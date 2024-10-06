import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

const AddressAutocomplete = ({ name, value, onChange, placeholder, className, coordinates }) => {
  const {
    ready,
    value: address,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
    onChange({ target: { name, value: e.target.value } });
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();

    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("📍 Coordinates: ", { lat, lng });
        coordinates({lng, lat})
        onChange({ target: { name, value: description } });
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          key={id}
          onClick={handleSelect(suggestion)}
          className="px-2 py-1 cursor-pointer hover:bg-gray-200"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={ref} className="relative">
      <input
        value={value}
        onChange={handleInput}
        // disabled={!ready}
        placeholder={placeholder}
        required
        className={className}
      />
      {status === "OK" && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-md">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
