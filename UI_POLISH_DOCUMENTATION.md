# UI/UX Polish Documentation

## Tổng Quan
Hệ thống UI/UX đã được nâng cấp với design system toàn diện, responsive layout, accessibility features, loading states, animations, và performance optimizations.

## 🎨 Design System

### Màu Sắc HCMUT
- **Primary**: Indigo (#4f46e5) - Màu chủ đạo
- **Secondary**: Gray tones - Màu phụ
- **HCMUT Blue**: #0071BC - Màu đặc trưng trường
- **HCMUT Orange**: #FF6B35 - Màu nhấn

### Typography
- **Font**: Inter (Google Fonts)
- **Scale**: 2xs, xs, sm, base, lg, xl, 2xl, 3xl
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 📱 Responsive Design

### Breakpoints
```javascript
sm: '640px'   // Mobile
md: '768px'   // Tablet  
lg: '1024px'  // Desktop
xl: '1280px'  // Large Desktop
2xl: '1536px' // Extra Large
```

### Layout Components

#### Container
```jsx
import { Container } from './components/ui/Layout';

<Container maxWidth="7xl" padding={true}>
  Content here
</Container>
```

#### Grid
```jsx
import { Grid } from './components/ui/Layout';

<Grid 
  cols={1} 
  responsive={{ sm: 2, lg: 4 }} 
  gap={6}
>
  {items.map(item => <div key={item.id}>{item.content}</div>)}
</Grid>
```

#### Flex
```jsx
import { Flex } from './components/ui/Layout';

<Flex 
  direction="row" 
  align="center" 
  justify="between"
  responsive={{
    base: { direction: 'col', gap: 4 },
    md: { direction: 'row', gap: 0 }
  }}
>
  <div>Left content</div>
  <div>Right content</div>
</Flex>
```

#### Show/Hide Components
```jsx
import { Show } from './components/ui/Layout';

<Show above="md">Desktop only content</Show>
<Show below="lg">Mobile/Tablet content</Show>
<Show only={['sm', 'md']}>Tablet only</Show>
```

## 🎭 Animations

### Basic Animations
```jsx
import { FadeIn, SlideIn, ScaleIn } from './components/ui/Animations';

<FadeIn direction="up" delay={200}>
  <Card>Animated content</Card>
</FadeIn>

<SlideIn direction="left" duration={300}>
  <div>Sliding content</div>
</SlideIn>

<ScaleIn fromScale={0.8}>
  <button>Scaling button</button>
</ScaleIn>
```

### Staggered Animations
```jsx
import { StaggerChildren } from './components/ui/Animations';

<StaggerChildren staggerDelay={100}>
  {items.map(item => (
    <Card key={item.id}>{item.content}</Card>
  ))}
</StaggerChildren>
```

### Hover Effects
```jsx
import { HoverScale } from './components/ui/Animations';

<HoverScale scale={1.05}>
  <Card>Hover to scale</Card>
</HoverScale>
```

## 🔄 Loading States

### Skeleton Components
```jsx
import { 
  Skeleton, 
  SkeletonCard, 
  SkeletonTable, 
  SkeletonDashboard 
} from './components/ui/Skeleton';

// Basic skeleton
<Skeleton className="h-4 w-3/4" />

// Card skeleton
<SkeletonCard />

// Table skeleton  
<SkeletonTable rows={5} columns={4} />

// Dashboard skeleton
<SkeletonDashboard />
```

### Loading States
```jsx
import { LoadingState } from './components/ui/EmptyStates';

<LoadingState 
  title="Loading..."
  description="Please wait while we fetch your data."
/>
```

## 📝 Enhanced Forms

### Form Components
```jsx
import { 
  FormInput, 
  FormTextarea, 
  FormSelect,
  FormCheckbox,
  FormRadioGroup 
} from './components/ui/Form';

<FormInput
  label="Email"
  type="email"
  required
  value={email}
  onChange={setEmail}
  error={emailError}
  hint="We'll never share your email"
  leftIcon={<Mail className="w-4 h-4" />}
/>

<FormSelect
  label="Subject"
  options={[
    { value: 'math', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' }
  ]}
  value={subject}
  onChange={setSubject}
/>
```

## 🔔 Notifications

### Toast System
```jsx
import { useToast, toast } from './components/ui/Toast';

function MyComponent() {
  const { showToast } = useToast();
  
  const handleSuccess = () => {
    showToast(toast.success(
      'Success!', 
      'Your changes have been saved.'
    ));
  };
  
  const handleError = () => {
    showToast(toast.error(
      'Error!', 
      'Something went wrong.'
    ));
  };
}

// App.jsx - Wrap with ToastProvider
import { ToastProvider } from './components/ui/Toast';

<ToastProvider>
  <App />
</ToastProvider>
```

## ♿ Accessibility

### ARIA Support
```jsx
import { 
  ScreenReaderOnly, 
  AccessibleButton,
  Heading,
  FormError 
} from './components/ui/Accessibility';

<AccessibleButton
  ariaLabel="Close dialog"
  onClick={handleClose}
>
  <X className="w-4 h-4" />
  <ScreenReaderOnly>Close</ScreenReaderOnly>
</AccessibleButton>

<Heading level={2} id="section-title">
  Section Title
</Heading>

<FormError id="email-error">
  Email is required
</FormError>
```

### Keyboard Navigation
```jsx
import { useKeyboardNavigation } from './components/ui/Accessibility';

function DropdownMenu({ items, onSelect }) {
  const { activeIndex, handleKeyDown } = useKeyboardNavigation(
    items, 
    onSelect
  );
  
  return (
    <div onKeyDown={handleKeyDown}>
      {items.map((item, index) => (
        <button 
          key={item.id}
          className={index === activeIndex ? 'bg-indigo-100' : ''}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
```

### Focus Management
```jsx
import { FocusTrap, AccessibleModal } from './components/ui/Accessibility';

<AccessibleModal 
  isOpen={isOpen}
  onClose={onClose}
  title="Edit Profile"
>
  <form>
    <input placeholder="Name" />
    <button type="submit">Save</button>
  </form>
</AccessibleModal>
```

## ⚡ Performance Optimizations

### Lazy Loading
```jsx
import { LazyImage, LazyLoad } from './components/ui/Performance';

// Lazy load images
<LazyImage
  src="/large-image.jpg"
  alt="Description"
  placeholder={<div>Loading...</div>}
/>

// Lazy load components
const LazyComponent = LazyLoad(() => import('./HeavyComponent'));

<Suspense fallback={<LoadingState />}>
  <LazyComponent />
</Suspense>
```

### Virtual Lists
```jsx
import { VirtualList } from './components/ui/Performance';

<VirtualList
  items={largeDataset}
  itemHeight={50}
  containerHeight={400}
  renderItem={(item, index) => (
    <div key={item.id} style={{ height: 50 }}>
      {item.name}
    </div>
  )}
/>
```

### Debounced Input
```jsx
import { DebouncedInput } from './components/ui/Performance';

<DebouncedInput
  value={searchTerm}
  onChange={setSearchTerm}
  delay={300}
  placeholder="Search..."
/>
```

### Error Boundaries
```jsx
import { ErrorBoundary } from './components/ui/Performance';

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <MyComponent />
</ErrorBoundary>
```

## 🎯 Empty States

```jsx
import { 
  EmptyState, 
  ErrorState, 
  NotFoundState 
} from './components/ui/EmptyStates';

<EmptyState
  title="No sessions found"
  description="You haven't booked any sessions yet."
  action={() => navigate('/book-session')}
  actionText="Book Your First Session"
/>

<ErrorState
  title="Something went wrong"
  description="We couldn't load your data."
  onRetry={refetch}
  showHomeButton
  onGoHome={() => navigate('/dashboard')}
/>
```

## 🚀 Best Practices

### 1. Responsive Design
- Always use responsive grid and flex layouts
- Test on multiple screen sizes
- Use Show/Hide components for device-specific content

### 2. Performance
- Wrap heavy components in ErrorBoundary
- Use lazy loading for images and components
- Implement virtual scrolling for large lists
- Debounce user inputs

### 3. Accessibility
- Always provide alt text for images
- Use semantic HTML elements
- Implement proper keyboard navigation
- Test with screen readers

### 4. Loading States
- Show skeletons while loading
- Provide meaningful error messages
- Use empty states for zero data scenarios

### 5. Animations
- Respect user's motion preferences
- Use subtle animations for better UX
- Stagger list animations for better perception

## 📋 Component Checklist

Khi tạo component mới, đảm bảo:

- [ ] Responsive design với breakpoints
- [ ] Loading states với skeleton
- [ ] Error handling với error boundaries  
- [ ] Accessibility với ARIA labels
- [ ] Keyboard navigation support
- [ ] Empty states handling
- [ ] Performance optimizations
- [ ] Consistent styling với design system
- [ ] Animations phù hợp
- [ ] TypeScript types (nếu sử dụng)

## 🔧 Customization

### Extending Theme
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#your-color'
      }
    }
  }
}
```

### Custom Components
```jsx
// Extend existing components
const CustomButton = ({ children, ...props }) => (
  <Button 
    className="custom-styling" 
    {...props}
  >
    {children}
  </Button>
);
```

## 🎉 Kết Luận

Hệ thống UI/UX đã được nâng cấp toàn diện với:
- ✅ Design system HCMUT chuyên nghiệp
- ✅ Responsive design hoàn chỉnh
- ✅ Accessibility standards
- ✅ Loading states và skeleton screens
- ✅ Smooth animations và micro-interactions
- ✅ Performance optimizations
- ✅ Error handling và empty states
- ✅ Toast notification system
- ✅ Enhanced form components

Tất cả đã sẵn sàng cho presentation chuyên nghiệp! 🚀
