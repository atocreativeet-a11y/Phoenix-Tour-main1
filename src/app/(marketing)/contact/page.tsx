'use client';

import { useState, useEffect, useRef } from 'react';
import * as Icons from "lucide-react";

const Phone = (Icons as any).Phone;
const Mail = (Icons as any).Mail;
const MapPin = (Icons as any).MapPin;
const Clock = (Icons as any).Clock;
const MessageCircle = (Icons as any).MessageCircle;
const Coffee = (Icons as any).Coffee;
const Navigation = (Icons as any).Navigation;
const Globe = (Icons as any).Globe;
const ZoomIn = (Icons as any).ZoomIn;
const ZoomOut = (Icons as any).ZoomOut;
const Layers = (Icons as any).Layers;
const Maximize2 = (Icons as any).Maximize2;
const Search = (Icons as any).Search;
const ChevronDown = (Icons as any).ChevronDown;

// Real Google Maps Component with Autocomplete
const RealGoogleMap = () => {
  const [activeMapView, setActiveMapView] = useState<'roadmap' | 'satellite'>('roadmap');
  const [mapZoom, setMapZoom] = useState(15);
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<any>(null);

  // Dynamically load Google Maps
  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
          setError('Google Maps API key is not configured. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment variables.');
          return;
        }

        if ((window as any).google) {
          setIsLoaded(true);
          setError(null);
          return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
        script.async = true;
        script.defer = true;
        
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
      if ((window as any).initMap) {
        delete (window as any).initMap;
      }
    };
  }, []);

  // Initialize map once loaded
  useEffect(() => {
    if (!isLoaded || !(window as any).google) return;

    const google = (window as any).google;

    const initMap = () => {
      if (!mapRef.current) return;

      const mapOptions = {
        center: { lat: 9.032, lng: 38.746 },
        zoom: 15,
        mapTypeId: 'roadmap',
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

      const officeMarker = new google.maps.Marker({
        position: { lat: 9.032, lng: 38.746 },
        map: mapInstance,
        title: "Phoenix Ethiopia Tours - Bole Road, Addis Ababa",
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

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 180px; font-family: sans-serif;">
            <h3 style="font-weight: bold; color: #3B82F6; margin: 0 0 4px 0; font-size: 14px;">Phoenix Tour Office</h3>
            <p style="margin: 0 0 6px 0; color: #4B5563; font-size: 12px;">Bole Road, Addis Ababa</p>
            <p style="margin: 0; font-size: 11px; color: #6B7280; line-height: 1.4;">
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

      if (autocompleteInputRef.current) {
        const autocompleteInstance = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
          fields: ['place_id', 'formatted_address', 'geometry', 'name'],
          componentRestrictions: { country: 'et' }
        });

        setAutocomplete(autocompleteInstance);

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          
          if (!place.geometry) {
            console.error("No details available for input: '" + place.name + "'");
            return;
          }

          mapInstance.setCenter(place.geometry.location!);
          mapInstance.setZoom(16);
          
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
    if (map && (window as any).google) {
      const google = (window as any).google;
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
    if (!searchQuery.trim() || !autocomplete || !(window as any).google) return;

    setIsSearching(true);
    const google = (window as any).google;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address: searchQuery, componentRestrictions: { country: 'ET' } }, (results: any[], status: string) => {
      setIsSearching(false);
      
      if (status === 'OK' && results?.[0] && map) {
        map.setCenter(results[0].geometry.location);
        map.setZoom(16);
        
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
      }
    });
  };

  if (error) {
    return (
      <div className="h-[350px] md:h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="text-center p-6 max-w-sm mx-auto">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-8 h-8 text-red-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">Map Unavailable</h3>
          <p className="text-xs md:text-sm text-gray-600 mb-4">{error}</p>
          <a
            href="https://maps.app.goo.gl/KoTcPBfFHGHR63G57"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-sm min-h-[40px]"
          >
            <Navigation className="w-3.5 h-3.5" />
            Open in Google Maps
          </a>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-[350px] md:h-[500px] bg-gradient-to-br from-blue-50 to-green-50 rounded-xl relative overflow-hidden flex items-center justify-center">
        <div className="text-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500 mx-auto mb-3"></div>
          <p className="text-sm text-gray-600 font-medium">Loading Google Maps...</p>
          <p className="text-xs text-gray-400 mt-1">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[380px] md:h-[500px] relative rounded-xl overflow-hidden border border-gray-100 shadow-inner">
      {/* Search Bar */}
      <div className="absolute top-3 left-3 right-3 md:top-4 md:left-4 md:right-4 z-10">
        <form onSubmit={handleSearchSubmit} className="relative flex gap-1.5 bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-md border border-gray-200">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              ref={autocompleteInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hotels, landmarks in Ethiopia..."
              className="w-full pl-9 pr-2 py-1.5 text-xs md:text-sm bg-transparent focus:outline-none placeholder-gray-400 text-gray-800"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="px-3 py-1.5 bg-primary-500 text-white text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50 min-h-[32px]"
          >
            {isSearching ? '...' : 'Search'}
          </button>
        </form>
      </div>

      {/* Google Map Container */}
      <div
        ref={mapRef}
        id="google-map"
        className="w-full h-full rounded-xl"
        style={{ borderRadius: '12px' }}
      />

      {/* Interactive Controls */}
      <div className="absolute top-16 right-3 md:top-20 md:right-4 flex flex-col gap-1.5 z-10">
        <button
          type="button"
          onClick={() => handleMapViewChange(activeMapView === 'roadmap' ? 'satellite' : 'roadmap')}
          className="bg-white p-2.5 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-1.5 border border-gray-200/50 touch-manipulation"
          title={`Switch to ${activeMapView === 'roadmap' ? 'Satellite' : 'Street'} view`}
        >
          <Layers className="w-4 h-4 text-gray-700" />
          <span className="text-[11px] md:text-xs font-bold text-gray-700 hidden sm:inline">
            {activeMapView === 'roadmap' ? 'Satellite' : 'Street'}
          </span>
        </button>
        
        <div className="bg-white p-1.5 rounded-lg shadow-md border border-gray-200/50 flex flex-col items-center">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors touch-manipulation"
            disabled={mapZoom >= 20}
          >
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </button>
          <div className="py-0.5 text-center select-none">
            <span className="text-[10px] font-bold text-gray-500">{mapZoom}x</span>
          </div>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded transition-colors touch-manipulation"
            disabled={mapZoom <= 10}
          >
            <ZoomOut className="w-4 h-4 text-gray-700" />
          </button>
        </div>
        
        <button
          type="button"
          onClick={resetView}
          className="bg-white p-2.5 rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200/50 touch-manipulation"
          title="Reset to office"
        >
          <Navigation className="w-4 h-4 text-gray-700" />
        </button>

        <button
          type="button"
          onClick={fullscreenView}
          className="bg-white p-2.5 rounded-lg shadow-md hover:bg-gray-50 transition-colors border border-gray-200/50 hidden md:block"
          title="Fullscreen"
        >
          <Maximize2 className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Location Info Overlay - Hidden on small mobile screens to keep view clean */}
      <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md max-w-[240px] border border-gray-200 hidden sm:block">
        <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-primary-500" />
          Location Details
        </h3>
        <p className="text-[11px] text-gray-600 mb-1.5 leading-normal">
          Our main office is located in Bole, Addis Ababa's commercial district.
        </p>
        <ul className="text-[10px] text-gray-500 space-y-0.5 grid grid-cols-1">
          <li>✓ 15 mins from Bole Airport</li>
          <li>✓ Parking & transport nearby</li>
        </ul>
      </div>

      {/* Legend */}
      <div className="absolute top-16 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow border border-gray-200 text-[10px] md:text-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-primary-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-medium">Our Office</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-green-600 rounded-full"></div>
            <span className="text-gray-700 font-medium">Airport</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ContactPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 md:py-20 overflow-x-hidden max-w-[100vw]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-1.5 text-primary-500 text-xs md:text-sm font-bold tracking-wider mb-2 md:mb-4 bg-primary-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            GET IN TOUCH
          </div>
          <h1 className="text-2xl md:text-5xl font-heading font-bold mb-3 md:mb-6 leading-tight text-gray-900">
            Contact <span className="text-primary-500">Phoenix Tours</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-2">
            Ready to explore Ethiopia? Our Ethiopian team is here to help plan your perfect adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-1 space-y-4 md:space-y-8 order-2 lg:order-1">
            {/* Ethiopian Office Card */}
            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-md border border-gray-200">
              <div className="flex items-start gap-3.5 mb-5 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">Our Addis Ababa Office</h3>
                  <p className="text-sm text-gray-600 leading-normal break-words">
                    Bole Road, Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">Phone (Ethiopia)</div>
                    <a href="tel:+251911920411" className="font-bold text-sm md:text-base text-gray-900 hover:text-primary-500 transition-colors block truncate">
                      +251 911 92 04 11
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">Email</div>
                    <a href="mailto:contact@phoenixethiopiatours.com" className="font-bold text-xs md:text-sm text-gray-900 hover:text-primary-500 transition-colors block truncate">
                      contact@phoenixethiopiatours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">WhatsApp</div>
                    <a href="https://wa.me/251911920411" target="_blank" rel="noopener noreferrer" className="font-bold text-sm md:text-base text-gray-900 hover:text-primary-500 transition-colors block truncate">
                      +251 911 92 04 11
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">Business Hours (EAT)</div>
                    <div className="font-bold text-xs md:text-sm text-gray-900">Mon-Sun: 8AM - 8PM</div>
                  </div>
                </div>
              </div>

              {/* Ethiopian Calendar Note */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Coffee className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900">13-Month Calendar</div>
                    <div className="text-[11px] text-gray-500">We align operations with Ethiopia's unique timeline</div>
                  </div>
                </div>
              </div>

              {/* Map Directions Button */}
              <div className="mt-5 md:mt-6">
                <a
                  href="https://maps.google.com/?q=Bole+Road,+Addis+Ababa,+Ethiopia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-primary-500 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-primary-600 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions on Google Maps
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-xl md:rounded-2xl p-6 md:p-8 text-white shadow-sm">
              <h3 className="text-base md:text-xl font-bold mb-1.5 md:mb-2">24/7 Tour Emergency</h3>
              <p className="mb-4 text-white/90 text-xs md:text-sm leading-relaxed">For urgent assistance during active tours anywhere in Ethiopia</p>
              <a href="tel:+251911920411" className="text-xl md:text-2xl font-bold mb-1.5 hover:underline block active:scale-95 transition-transform max-w-max">
                +251 911 92 04 11
              </a>
              <p className="text-[10px] md:text-xs opacity-90 leading-normal">Available anytime, anywhere in Ethiopia</p>
            </div>
          </div>

          {/* Map Section - Right Side */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              {/* Map Header */}
              <div className="p-4 md:p-8">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Find Our Office in Addis Ababa</h2>
                <p className="text-xs md:text-sm text-gray-500 mb-4">Located in the heart of Ethiopia's capital city</p>
                
                {/* Info Box */}
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100/50">
                  <p className="text-xs text-blue-800 flex items-start gap-2 leading-relaxed">
                    <span className="font-bold flex-shrink-0">Interactive Map:</span> 
                    Search landmarks, switch views, or re-center anytime using local controls.
                  </p>
                </div>
              </div>

              {/* Real Google Map Container */}
              <RealGoogleMap />

              {/* Map Footer Control Links */}
              <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-gray-500 font-medium">Search Points</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Bole+Road,+Addis+Ababa,+Ethiopia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 font-bold hover:text-primary-600 flex items-center gap-1 min-h-[36px] touch-manipulation active:scale-95 transition-transform"
                  >
                    <span>Full Map View</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Accordion Panels for Mobile / Grid Grid for Desktop */}
            <div className="mt-4 md:mt-6 block lg:hidden space-y-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('hours')}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary-500" />
                    Visiting Hours
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeAccordion === 'hours' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${activeAccordion === 'hours' ? 'max-h-40 border-t border-gray-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-gray-50/50 text-xs sm:text-sm">
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex justify-between"><span>Monday - Friday</span><span className="font-bold">8:00 AM - 7:00 PM</span></li>
                      <li className="flex justify-between"><span>Saturday</span><span className="font-bold">9:00 AM - 5:00 PM</span></li>
                      <li className="flex justify-between"><span>Sunday</span><span className="font-bold">10:00 AM - 3:00 PM</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('regions')}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-primary-500" />
                    Regional Staff Coverage
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeAccordion === 'regions' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${activeAccordion === 'regions' ? 'max-h-40 border-t border-gray-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-gray-50/50">
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">Local field experts available dynamically across:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Bahir Dar', 'Lalibela', 'Axum', 'Gondar', 'Hawassa', 'Arba Minch'].map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-medium rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Side Info Grid */}
            <div className="mt-6 hidden lg:grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  Visiting Hours
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">10:00 AM - 3:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-500" />
                  Regional Offices
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  We also have local guides stationed in all major Ethiopian regions:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100">Bahir Dar</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">Lalibela</span>
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-100">Axum</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">Gondar</span>
                  <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full border border-pink-100">Hawassa</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">Arba Minch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}