import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedUser, createAuthError } from '@/lib/middleware';
import { userModel } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const authUser = await getAuthenticatedUser(request);
    if (!authUser) {
      return createAuthError();
    }
    
    // Get user from database
    const user = await userModel.findById(authUser.userId).select('-password');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
    
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
