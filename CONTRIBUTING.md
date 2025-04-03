# 🤝 Contributing to Livestream Calculator

Thank you for considering contributing to the Livestream Calculator! This document outlines the process for contributing to this project.

## 📜 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## 🐛 Reporting Issues

If you find a bug or have a suggestion for improving the calculator:

1. Check if the issue already exists in the [Issues](https://github.com/nahani/livestream-calculator/issues) tab
2. If not, create a new issue with a descriptive title and detailed information about:
   - What you expected to happen
   - What actually happened
   - Steps to reproduce the issue
   - Screenshots if applicable
   - Your environment (browser, OS, etc.)

## 🔀 Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the tests and linter to ensure code quality
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 💻 Development Setup

Follow these steps to set up your development environment:

```bash
# Clone your fork
git clone https://github.com/your-username/livestream-calculator.git
cd livestream-calculator

# Install dependencies
yarn install

# Start development server
yarn dev
```

## 🧪 Testing

Please make sure to test your changes thoroughly before submitting a pull request.

```bash
# Run tests
yarn test

# Run linter
yarn lint
```

## 🌐 Internationalization

When adding new text to the application:

1. Add the text to the appropriate translation file in `src/utils/i18n.ts`
2. Make sure to add translations for both English and French

## 🎨 Styling Guidelines

- Follow the existing code style
- Use TailwindCSS for styling
- Maintain dark/light mode compatibility

## 📝 Documentation

If you add or change functionality, please update the documentation accordingly.

## 📋 Pull Request Checklist

Before submitting your pull request, make sure:

- [ ] Your code follows the style guidelines of the project
- [ ] You have added tests that prove your fix/feature works
- [ ] Documentation has been updated (if appropriate)
- [ ] Your commits are properly formatted and have descriptive messages
- [ ] You have added translations for any user-facing text

Thank you for your contribution! 🙌 