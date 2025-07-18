import React, { useState } from 'react';
import { Card, Button, DatePicker, Select, Space, Typography, Row, Col, Divider } from 'antd';
import { EnvironmentOutlined, SwapOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';

const { Text } = Typography;
const { Option } = Select;

interface SearchData {
  from: string;
  to: string;
  departureDate: Dayjs | null;
  returnDate?: Dayjs | null;
  passengers: number;
  tripType: 'round-trip' | 'one-way';
}

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [fromCity, setFromCity] = useState('New York (NYC)');
  const [toCity, setToCity] = useState('Los Angeles (LAX)');
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'round-trip' | 'one-way'>('round-trip');

  const popularCities = [
    'New York (NYC)', 'Los Angeles (LAX)', 'Chicago (CHI)', 'Miami (MIA)',
    'San Francisco (SFO)', 'Boston (BOS)', 'Seattle (SEA)', 'Las Vegas (LAS)',
    'Orlando (ORL)', 'Denver (DEN)', 'Atlanta (ATL)', 'Phoenix (PHX)'
  ];

  const handleSwapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handleSearch = () => {
    const searchData = {
      from: fromCity,
      to: toCity,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : null,
      passengers,
      tripType
    };
    onSearch(searchData);
  };

  return (
    <Card style={{ borderRadius: '16px', marginBottom: '16px' }}>
      {/* Trip Type Buttons */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button
            type={tripType === 'round-trip' ? 'primary' : 'default'}
            onClick={() => setTripType('round-trip')}
            style={{ flex: 1, borderRadius: '8px' }}
          >
            Round Trip
          </Button>
          <Button
            type={tripType === 'one-way' ? 'primary' : 'default'}
            onClick={() => setTripType('one-way')}
            style={{ flex: 1, borderRadius: '8px' }}
          >
            One Way
          </Button>
        </div>
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* From and To Cities */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                From
              </Text>
              <Select
                value={fromCity}
                onChange={setFromCity}
                style={{ width: '100%' }}
                variant={'borderless'}
                showSearch
                placeholder="Select departure city"
                optionFilterProp="children"
                suffixIcon={<EnvironmentOutlined />}
              >
                {popularCities.map(city => (
                  <Option key={city} value={city}>{city}</Option>
                ))}
              </Select>
            </div>
            <Button
              type="text"
              icon={<SwapOutlined />}
              onClick={handleSwapCities}
              style={{
                backgroundColor: '#f5f5f5',
                marginLeft: '8px',
                borderRadius: '8px',
                width: '40px',
                height: '40px'
              }}
            />
          </div>
          
          <Divider style={{ margin: '12px 0' }} />
          
          <div>
            <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
              To
            </Text>
            <Select
              value={toCity}
              onChange={setToCity}
              style={{ width: '100%' }}
              variant={'borderless'}
              showSearch
              placeholder="Select destination city"
              optionFilterProp="children"
              suffixIcon={<EnvironmentOutlined />}
            >
              {popularCities.map(city => (
                <Option key={city} value={city}>{city}</Option>
              ))}
            </Select>
          </div>
        </div>

        {/* Date and Passengers */}
        <Row gutter={12}>
          <Col span={tripType === 'round-trip' ? 8 : 12}>
            <Card
              size="small"
              style={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px' }}
            >
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                Departure
              </Text>
              <DatePicker
                value={departureDate}
                onChange={setDepartureDate}
                variant='borderless'
                style={{ width: '100%', padding: 0 }}
                suffixIcon={<CalendarOutlined />}
                placeholder="Select date"
              />
            </Card>
          </Col>
          
          {tripType === 'round-trip' && (
            <Col span={8}>
              <Card
                size="small"
                style={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px' }}
              >
                <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                  Return
                </Text>
                <DatePicker
                  value={returnDate}
                  onChange={setReturnDate}
                  variant={'borderless'}
                  style={{ width: '100%', padding: 0 }}
                  suffixIcon={<CalendarOutlined />}
                  placeholder="Select date"
                />
              </Card>
            </Col>
          )}
          
          <Col span={tripType === 'round-trip' ? 8 : 12}>
            <Card
              size="small"
              style={{ backgroundColor: '#f8fafc', border: 'none', borderRadius: '8px' }}
            >
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>
                Passengers
              </Text>
              <Select
                value={passengers}
                onChange={setPassengers}
                variant={'borderless'}
                style={{ width: '100%' }}
                suffixIcon={<TeamOutlined />}
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <Option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </Option>
                ))}
              </Select>
            </Card>
          </Col>
        </Row>

        {/* Search Button */}
        <Button
          type="primary"
          size="large"
          block
          onClick={handleSearch}
          style={{
            height: '48px',
            fontSize: '16px',
            fontWeight: 600,
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(24, 144, 255, 0.3)'
          }}
        >
          Search Flights
        </Button>
      </Space>
    </Card>
  );
};

export default SearchForm;
