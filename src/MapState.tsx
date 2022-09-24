// ...MapState.tsx
import React, { createContext,useReducer,useContext, ReactNode } from 'react';

type MapState = {
  title? : string;
  rent? : string;
  description? : string;
  startTime? : string   
  endTime? : string;
};

type MapActions =
    | {
      type: 'setFeatureRef';
      payload: any;
    }
  | { 
      type: 'resetFeatureRef';
    }
const initialState: MapState[] = []
// By setting the typings here, we ensure we get intellisense in VS Code
const initialMapContext: { mapState: MapState[]; setMapState: React.Dispatch<MapActions> } = {
  mapState: initialState,
  // will update to the reducer we provide in MapProvider
  setMapState: () => {}
};

// No need to export this as we use it internally only
const MapContext = createContext(initialMapContext);

//... types and MapContext removed for readability

const reducer = (state: MapState[], action: MapActions) => {
  switch (action.type) {
    case 'setFeatureRef':
      return [
        // if we had other state I would spread it here: ...state,
        ...state, action.payload,
      ];
    case 'resetFeatureRef':
      return {
        initialState
      };
    default:
      return state;
  }
};
interface MapProviderProps {
  children?: ReactNode;
}


export function MapProvider({ children }: MapProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // rename the useReducer result to something more useful
  const mapState = state;
  const setMapState = dispatch;

  // pass the state and reducer to the context, dont forget to wrap the children
  return <MapContext.Provider value={{ mapState, setMapState }}>{children}</MapContext.Provider>;
}

// ... types, reducer, MapProvider and MapContext removed for readability

/**
 * To use and set the state of the map from anywhere in the app
 * - @returns an object with a reducer function `setMapState` and the `mapState`
 */

export const useMapState = () => useContext(MapContext);