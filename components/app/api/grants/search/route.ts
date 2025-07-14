import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const filters = await req.json();
    
    // This would integrate with real grant databases or scraping services
    // For now, return mock data
    const mockGrants = [
      {
        id: '1',
        title: 'Small Business Innovation Research (SBIR)',
        description: 'Federal funding program for small businesses to engage in R&D.',
        amount: '$50,000 - $1,500,000',
        deadline: '2024-03-15',
        eligibility: ['Small business with <500 employees', 'US-based company', 'R&D focus'],
        state: filters.state || 'National',
        category: 'Technology',
        url: 'https://www.sbir.gov'
      },
      // Add more mock grants based on filters
    ];
    
    // Filter grants based on search criteria
    let filteredGrants = mockGrants;
    
    if (filters.state) {
      filteredGrants = filteredGrants.filter(grant => 
        grant.state === filters.state || grant.state === 'National'
      );
    }
    
    if (filters.category) {
      filteredGrants = filteredGrants.filter(grant => 
        grant.category === filters.category
      );
    }
    
    if (filters.search) {
      filteredGrants = filteredGrants.filter(grant =>
        grant.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        grant.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    return NextResponse.json({ grants: filteredGrants });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search grants' }, { status: 500 });
  }
}
