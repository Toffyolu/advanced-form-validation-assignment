import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#111' }}>
      <Tabs.Screen name="index" options={{ title: 'Sign Up' }} />
      <Tabs.Screen name="employee" options={{ title: 'Employee' }} />
    </Tabs>
  );
}
