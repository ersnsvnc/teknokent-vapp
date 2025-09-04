import { render, screen } from '@testing-library/react';
import ExampleComponent from '../index';
import '@testing-library/jest-dom';
import { getExample } from '@/services/exampleService';
import type { Example } from '@/types/api/example';
import type { ApiResponse } from '@/types/api/common';

// Mock the entire service module
jest.mock('@/services/exampleService');

// Type-cast the mock for TypeScript support
const mockedGetExample = getExample as jest.Mock;

describe('Example Component', () => {
  // Clean up mocks after each test to ensure test isolation
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case 1: Successful data fetch and rendering
  it('should render a list of users on successful data fetch', async () => {
    const mockUsers: Example[] = [
      { id: 1, name: 'Bruce Wayne' },
      { id: 2, name: 'Clark Kent' },
    ];

    const mockSuccessResult: ApiResponse<Example[]> = {
      success: true,
      data: mockUsers,
    };

    // Configure the mock to resolve with our success object
    mockedGetExample.mockResolvedValue(mockSuccessResult);

    render(<ExampleComponent />);

    // Initially, the list should not be there
    expect(screen.queryByText('Bruce Wayne')).not.toBeInTheDocument();

    // Wait for the async operation to complete and assert that the users are rendered
    // findBy* queries are async and will wait for the element to appear
    expect(await screen.findByText('Bruce Wayne')).toBeInTheDocument();
    expect(await screen.findByText('Clark Kent')).toBeInTheDocument();

    // Ensure the error message is not displayed
    expect(screen.queryByText(/Error:/)).not.toBeInTheDocument();
  });

  // Test case 2: Data fetching failure
  it('should render an error message when data fetch fails', async () => {
    const errorMessage = 'Network request failed';
    const mockErrorResult: ApiResponse<Example[]> = {
      success: false,
      error: { message: errorMessage },
    };

    // Configure the mock to resolve with our error object
    mockedGetExample.mockResolvedValue(mockErrorResult);

    render(<ExampleComponent />);

    // Wait for the async operation to complete and assert the error is shown
    const errorElement = await screen.findByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();

    // Ensure the main content (Users heading) is not rendered
    expect(screen.queryByRole('heading', { name: /Users/i })).not.toBeInTheDocument();
  });

  // Test case 3: Successful fetch with an empty array
  it('should render the heading but no list items for an empty user array', async () => {
    const mockEmptyResult: ApiResponse<Example[]> = {
      success: true,
      data: [], // Successful fetch, but no data
    };

    mockedGetExample.mockResolvedValue(mockEmptyResult);

    render(<ExampleComponent />);

    // Wait for the component to finish fetching and rendering
    // The heading should be present
    const heading = await screen.findByRole('heading', { name: /Users/i });
    expect(heading).toBeInTheDocument();

    // The list element should be in the document, but it should be empty
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(0);

    // No list items should be found
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});
