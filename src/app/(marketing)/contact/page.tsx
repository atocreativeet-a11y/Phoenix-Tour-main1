// src/app/(marketing)/contact/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Coffee, Navigation, Globe, ZoomIn, ZoomOut, Layers, Maximize2, Search } from 'lucide-react';

// Real Google Maps Component with Autocomplete
const RealGoogleMap = () => {
  const [activeMapView, setActiveMapView] = useState<'roadmap' | 'satellite'>('roadmap');
  const [mapZoom, setMapZoom] = useState(15);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  // Dynamically load Google Maps
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Check if Google Maps API key is available
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
          setError('Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.');
          return;
        }

        // Dynamically load Google Maps script
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        
        // Add callback function to window
        (window as any).initMap = () => {
          setIsLoaded(true);
          setError(null);
        };
        
        script.onerror = () => {
          setError('Failed to load Google Maps. Please check your API key and internet connection.');
        };
        
        document.head.appendChild(script);
      } catch (err) {
        setError('Error loading Google Maps.');
      }
    };

    loadGoogleMaps();

    return () => {
      // Cleanup
      if ((window as any).initMap) {
        delete (window as any).initMap;
      }
    };
  }, []);

  // Initialize map once loaded
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const initMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: { lat: 9.032, lng: 38.746 },
        zoom: 15,
        mapTypeId: 'roadmap' as google.maps.MapTypeId,
        disableDefaultUI: true,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
          },
          {
            featureType: "transit",
            elementType: "labels.icon",
            stylers: [{ visibility: "off" }]
          }
        ]
      };

      const mapInstance = new google.maps.Map(mapRef.current, mapOptions);
      setMap(mapInstance);

      // Add office marker with animation
      const officeMarker = new google.maps.Marker({
        position: { lat: 9.032, lng: 38.746 },
        map: mapInstance,
        title: "Phoenix Tour Office - Bole Road, Addis Ababa",
        animation: google.maps.Animation.DROP,
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#3B82F6" fill-opacity="0.2">
                <animate attributeName="r" from="18" to="24" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="20" cy="20" r="14" fill="#3B82F6" fill-opacity="0.3">
                <animate attributeName="r" from="14" to="20" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
                <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" begin="0.5s"/>
              </circle>
              <path d="M20 0C12.27 0 6 6.27 6 14C6 23.03 20 40 20 40C20 40 34 23.03 34 14C34 6.27 27.73 0 20 0ZM20 20C17.79 20 16 18.21 16 16C16 13.79 17.79 12 20 12C22.21 12 24 13.79 24 16C24 18.21 22.21 20 20 20Z" fill="#3B82F6"/>
              <path d="M20 0C12.27 0 6 6.27 6 14C6 23.03 20 40 20 40C20 40 34 23.03 34 14C34 6.27 27.73 0 20 0Z" fill="#1D4ED8" fill-opacity="0.8"/>
              <circle cx="20" cy="16" r="4" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 50),
          anchor: new google.maps.Point(20, 40)
        }
      });

      // Add airport marker
      new google.maps.Marker({
        position: { lat: 8.977, lng: 38.799 },
        map: mapInstance,
        title: "Bole International Airport",
        icon: {
          url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#10B981" fill-opacity="0.3"/>
              <circle cx="15" cy="15" r="8" fill="#10B981"/>
              <path d="M15 7L19 13H11L15 7Z" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15)
        }
      });

      // Add info window for office
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 200px;">
            <h3 style="font-weight: bold; color: #3B82F6; margin: 0 0 8px 0;">Phoenix Tour Office</h3>
            <p style="margin: 0 0 8px 0; color: #4B5563;">Bole Road, Addis Ababa</p>
            <p style="margin: 0; font-size: 12px; color: #6B7280;">
              ✓ 15min from airport<br>
              ✓ Parking available<br>
              ✓ Near major hotels
            </p>
          </div>
        `
      });

      officeMarker.addListener('click', () => {
        infoWindow.open(mapInstance, officeMarker);
      });

      // Initialize autocomplete
      if (autocompleteInputRef.current) {
        const autocompleteInstance = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          componentRestrictions: { country: 'et' } // Restrict to Ethiopia
        });

        setAutocomplete(autocompleteInstance);

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          
          if (!place.geometry) {
            console.error("No details available for input: '" + place.name + "'");
            return;
          }

          // Move map to selected location
          mapInstance.setCenter(place.geometry.location!);
          mapInstance.setZoom(16);
          
          // Add temporary marker for searched location
          new google.maps.Marker({
            position: place.geometry.location!,
            map: mapInstance,
            title: place.name || 'Searched Location',
            icon: {
              url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 0C8.1 0 2.5 5.6 2.5 12.5C2.5 22.5 15 40 15 40C15 40 27.5 22.5 27.5 12.5C27.5 5.6 21.9 0 15 0ZM15 20C12.24 20 10 17.76 10 15C10 12.24 12.24 10 15 10C17.76 10 20 12.24 20 15C20 17.76 17.76 20 15 20Z" fill="#EF4444"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(30, 40),
              anchor: new google.maps.Point(15, 40)
            }
          });

          setSearchQuery(place.formatted_address || '');
        });
      }

      // Add zoom listener
      google.maps.event.addListener(mapInstance, 'zoom_changed', () => {
        setMapZoom(mapInstance.getZoom() || 15);
      });

      return mapInstance;
    };

    const mapInstance = initMap();

    return () => {
      if (mapInstance) {
        google.maps.event.clearInstanceListeners(mapInstance);
      }
    };
  }, [isLoaded]);

  const handleZoomIn = () => {
    if (map) {
      const newZoom = map.getZoom()! + 1;
      map.setZoom(newZoom);
      setMapZoom(newZoom);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const newZoom = map.getZoom()! - 1;
      map.setZoom(newZoom);
      setMapZoom(newZoom);
    }
  };

  const handleMapViewChange = (view: 'roadmap' | 'satellite') => {
    setActiveMapView(view);
    if (map) {
      map.setMapTypeId(view === 'satellite' ? google.maps.MapTypeId.HYBRID : google.maps.MapTypeId.ROADMAP);
    }
  };

  const resetView = () => {
    if (map) {
      map.setCenter({ lat: 9.032, lng: 38.746 });
      map.setZoom(15);
      setMapZoom(15);
    }
  };

  const fullscreenView = () => {
    if (mapRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        mapRef.current.requestFullscreen?.();
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !autocomplete) return;

    setIsSearching(true);
    
    // Create a geocoder instance
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: searchQuery, componentRestrictions: { country: 'ET' } }, (results, status) => {
      setIsSearching(false);
      
      if (status === 'OK' && results?.[0] && map) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(16);
        
        // Add marker for searched location
        new google.maps.Marker({
          position: results[0].geometry.location,
          map: map,
          title: results[0].formatted_address,
          icon: {
            url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
              <svg width="30" height="40" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C8.1 0 2.5 5.6 2.5 12.5C2.5 22.5 15 40 15 40C15 40 27.5 22.5 27.5 12.5C27.5 5.6 21.9 0 15 0ZM15 20C12.24 20 10 17.76 10 15C10 12.24 12.24 10 15 10C17.76 10 20 12.24 20 15C20 17.76 17.76 20 15 20Z" fill="#EF4444"/>
              </svg>
            `),
            scaledSize: new google.maps.Size(30, 40),
            anchor: new google.maps.Point(15, 40)
          }
        });
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };

  if (error) {
    return (
      <div className="h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Map Unavailable</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <a
            href="https://maps.app.goo.gl/KoTcPBfFHGHR63G57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Google Maps...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[500px] relative rounded-xl overflow-hidden">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            ref={autocompleteInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for hotels, airports, or landmarks in Ethiopia..."
            className="w-full pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary-500 text-white text-sm font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Google Map Container */}
      <div
        ref={mapRef}
        id="google-map"
        className="w-full h-full rounded-xl"
        style={{ borderRadius: '16px' }}
      />

      {/* Interactive Controls */}
      <div className="absolute top-20 right-4 flex flex-col gap-2 z-10">
        <button
          onClick={() => handleMapViewChange(activeMapView === 'roadmap' ? 'satellite' : 'roadmap')}
          className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-2"
          title={`Switch to ${activeMapView === 'roadmap' ? 'Satellite' : 'Street'} view`}
        >
          <Layers className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-medium">
            {activeMapView === 'roadmap' ? 'Satellite' : 'Street'}
          </span>
        </button>
        
        <div className="bg-white p-2 rounded-lg shadow-md">
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            disabled={mapZoom >= 20}
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
          <div className="text-center py-1">
            <span className="text-xs font-medium text-gray-700">{mapZoom}x</span>
          </div>
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
            disabled={mapZoom <= 10}
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        
        <button
          onClick={resetView}
          className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          title="Reset to our office"
        >
          <Navigation className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={fullscreenView}
          className="bg-white p-3 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          title="Fullscreen"
        >
          <Maximize2 className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Location Info Overlay */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary-500" />
          Location Details
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          Our main office is conveniently located in Bole, Addis Ababa's commercial district.
        </p>
        <ul className="text-xs text-gray-500 space-y-1">
          <li>✓ 15 minutes from Bole Airport</li>
          <li>✓ Parking available</li>
          <li>✓ Near major hotels</li>
          <li>✓ Accessible by public transport</li>
        </ul>
      </div>

      {/* Current Location Indicator */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow border border-gray-200">
        <span className="text-sm font-medium text-gray-700">Zoom: {mapZoom}x</span>
      </div>

      {/* Legend */}
      <div className="absolute top-20 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow border border-gray-200">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-700">Our Office</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-xs text-gray-700">Airport</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-700">Search Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            GET IN TOUCH
          </div>
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="text-gray-900">Contact </span>
            <span className="text-primary-500">Phoenix Tour</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ready to explore Ethiopia? Our Ethiopian team is here to help plan your perfect adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-1 space-y-8">
            {/* Ethiopian Office Card */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Addis Ababa Office</h3>
                  <p className="text-gray-600">
                    Bole Road, Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone (Ethiopia)</div>
                    <div className="font-semibold text-gray-900">+251 11 123 4567</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-semibold text-gray-900">contact@phoenixtour.et</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">WhatsApp</div>
                    <div className="font-semibold text-gray-900">+251 91 234 5678</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Business Hours (EAT)</div>
                    <div className="font-semibold text-gray-900">Mon-Sun: 8AM - 8PM</div>
                  </div>
                </div>
              </div>

              {/* Ethiopian Calendar Note */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-primary-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">13-Month Calendar</div>
                    <div className="text-xs text-gray-600">We follow Ethiopia's unique calendar</div>
                  </div>
                </div>
              </div>

              {/* Map Directions Button */}
              <div className="mt-8">
                <a
                  href="https://maps.app.goo.gl/KoTcPBfFHGHR63G57"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions on Google Maps
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">24/7 Tour Emergency</h3>
              <p className="mb-6 text-white/90">For urgent assistance during tours anywhere in Ethiopia</p>
              <div className="text-2xl font-bold mb-2">+251 90 111 2233</div>
              <p className="text-sm opacity-90">Available anytime, anywhere in Ethiopia</p>
            </div>
          </div>

          {/* Map Section - Right Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Map Header */}
              <div className="px-8 pt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Our Office in Addis Ababa</h2>
                <p className="text-gray-600 mb-6">Located in the heart of Ethiopia's capital city</p>
                
                {/* Info Box */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <span className="font-medium">Interactive Map:</span> 
                    Search for locations, switch between street/satellite views, and explore Ethiopia!
                  </p>
                </div>
              </div>

              {/* Real Google Map Container */}
              <RealGoogleMap />

              {/* Map Legend */}
              <div className="px-8 pb-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
                      <div className="absolute -inset-1.5 border-2 border-primary-500/30 rounded-full animate-ping"></div>
                    </div>
                    <span>Our Office (Blinking)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span>Airport</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Search Results</span>
                  </div>
                  <div className="ml-auto">
                    <a
                      href="https://maps.app.goo.gl/KoTcPBfFHGHR63G57"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-500 font-medium hover:text-primary-600 flex items-center gap-1"
                    >
                      Open in Google Maps
                      <Navigation className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  Visiting Hours
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM - 3:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-500" />
                  Regional Offices
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  We also have local guides in all major Ethiopian regions:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs rounded-full">Bahir Dar</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Lalibela</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">Axum</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Gondar</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 text-xs rounded-full">Hawassa</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">Arba Minch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}