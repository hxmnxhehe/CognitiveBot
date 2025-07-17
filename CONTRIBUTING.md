
# Contributing to CognitiveGPT

Thank you for your interest in contributing to CognitiveGPT! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites
- Node.js 20 or higher
- Git
- Basic knowledge of TypeScript, React, and Express.js

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/cognitivegpt.git
   cd cognitivegpt
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Code Style and Standards

### TypeScript
- Use TypeScript for all new code
- Enable strict mode in TypeScript configuration
- Use proper type definitions instead of `any`
- Use interfaces for object shapes

### React Components
- Use functional components with hooks
- Use TypeScript for component props
- Follow React best practices
- Use Shadcn/ui components when possible

### Code Formatting
- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code patterns

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── pages/          # Page components
├── server/                 # Express backend
│   ├── services/           # Business logic services
│   ├── index.ts           # Server entry point
│   └── routes.ts          # API routes
├── shared/                 # Shared types and schemas
└── docs/                  # Documentation
```

## Contributing Guidelines

### 1. Issues
- Check existing issues before creating new ones
- Use clear, descriptive titles
- Provide detailed descriptions with steps to reproduce
- Label issues appropriately

### 2. Pull Requests
- Create feature branches from `main`
- Use descriptive branch names: `feature/add-user-authentication`
- Write clear commit messages
- Keep PRs focused on a single feature/fix
- Update documentation if needed
- Test your changes thoroughly

### 3. Commit Message Format
Use conventional commit format:
```
type(scope): brief description

Detailed description if needed

- List any breaking changes
- Reference relevant issues: Fixes #123
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 4. Testing
- Test your changes in development environment
- Ensure existing functionality still works
- Add tests for new features when applicable
- Verify environment variable changes work correctly

## Areas for Contribution

### High Priority
- **Authentication System**: Improve Firebase integration
- **Error Handling**: Better error messages and recovery
- **Performance**: Optimize AI agent processing
- **Accessibility**: Improve screen reader support
- **Mobile Experience**: Enhance mobile responsiveness

### Documentation
- API documentation
- User guide
- Deployment guides
- Architecture documentation

### Features
- Multi-language support
- Voice input/output
- Progress analytics dashboard
- Export conversation history
- Customizable AI personalities

### Bug Fixes
- Check the issues page for reported bugs
- Test edge cases in the chat interface
- Improve error handling in AI services

## AI Services Guidelines

### Working with LLM APIs
- Always implement fallback mechanisms
- Handle API rate limits gracefully
- Validate API responses
- Log errors appropriately
- Test with various input types

### Agent Development
- Follow existing agent patterns
- Implement proper error handling
- Add logging for debugging
- Test agent interactions thoroughly

## Environment Variables

When adding new environment variables:
1. Add to `.env.example` with placeholder values
2. Update `docs/ENVIRONMENT_SETUP.md`
3. Add validation in relevant service files
4. Document in README.md if user-facing

## Database Changes

When modifying the database schema:
1. Use Drizzle ORM migrations
2. Test migrations in development
3. Update schema documentation
4. Consider backward compatibility

## Deployment Considerations

- Ensure changes work in production environment
- Update deployment configuration if needed
- Test with production-like data
- Consider performance implications

## Getting Help

- Join our community discussions
- Check existing documentation
- Ask questions in issues or discussions
- Review similar implementations in the codebase

## Code Review Process

1. **Automated Checks**: Ensure all automated checks pass
2. **Manual Review**: Maintainers will review code quality, architecture, and functionality
3. **Testing**: Verify changes work as expected
4. **Documentation**: Ensure documentation is updated
5. **Approval**: At least one maintainer approval required

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mentions for outstanding contributions

## Questions?

If you have questions about contributing:
- Open a discussion on GitHub
- Check existing documentation
- Review similar contributions
- Contact the maintainers

Thank you for contributing to CognitiveGPT! 🚀
