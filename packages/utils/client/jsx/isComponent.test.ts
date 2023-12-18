import { Project, SyntaxKind } from 'ts-morph'
import { isComponent } from './isComponent'

describe('isJsxFunctionComponent', () => {
  const project = new Project()

  it('should return true for a function component', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `function Component() { return <div /> }`,
      { overwrite: true }
    )
    const functionDeclaration = sourceFile.getFirstDescendantByKind(
      SyntaxKind.FunctionDeclaration
    )
    expect(isComponent(functionDeclaration!)).toBe(true)
  })

  it('should return true for a function component with return type', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `function Component(): JSX.Element { return <div /> }`,
      { overwrite: true }
    )
    const functionDeclaration = sourceFile.getFirstDescendantByKind(
      SyntaxKind.FunctionDeclaration
    )
    expect(isComponent(functionDeclaration!)).toBe(true)
  })

  it('should return true for an arrow function component', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `const Component = () => <div />`,
      { overwrite: true }
    )
    const arrowFunction = sourceFile.getFirstDescendantByKind(
      SyntaxKind.ArrowFunction
    )
    expect(isComponent(arrowFunction!)).toBe(true)
  })

  it('should return false for a function component that returns a function type', () => {
    const sourceFile = project.createSourceFile(
      'test.ts',
      `function Component() { return () => {} }`,
      { overwrite: true }
    )
    const functionDeclaration = sourceFile.getFirstDescendantByKind(
      SyntaxKind.FunctionDeclaration
    )
    expect(isComponent(functionDeclaration!)).toBe(false)
  })
})
