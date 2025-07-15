import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import { Header } from '../../components/commons';

export default function PrivacyPolicyScreen({ navigation }) {
  return (
    <>
      <View style={tw.style('flex-1 bg-primaryDark')}>
        <Header
          title="Privacy And Policy"
          styles={tw.style('mx-4 mb-2')}
          onBackPress={() => {
            navigation.goBack();
          }}
        />
        <ScrollView>
          <View style={tw.style('mx-6 mt-6')}>
            <View style={tw.style('mb-2')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                Privacy Policy
              </Text>
              <Text
                style={tw.style('text-white text-base font-montserrat italic')}>
                Last Updated: July 14, 2025
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text style={tw.style('text-white text-base font-montserrat ')}>
                Cinemax App ("we", "our", or "the app") is committed to
                protecting your privacy. This Privacy Policy describes how we
                collect, use, and safeguard your personal information when you
                use our mobile application on Android and iOS platforms.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                1. Information We Collect
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                We may collect the following personal infromation:
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Full Name
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Email Address
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Phone Number
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                2. How We User Your Information
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                We use your information:
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Provide a personalized user experience.
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Analyze app usage for performance improvement.
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Support user authentication and account management.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                3. Third-Party Services
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                We use Firebase (a service provided by Google) for:
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - User authentication
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Data storage
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                - Analytics
              </Text>
              <Text
                style={tw.style('text-white text-base font-montserrat mt-2')}>
                Firebase may collect and process your data in accordance with
                their own privacy policy. You can read more at Google Privacy
                Policy.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                4. Account Deletion
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                You have the right to delete your account at any time. You can
                do this from within the app settings or by contacting us
                directly.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                5. Data Security
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                We take appropriate technical and organizational measures to
                protect your personal data from unauthorized access, use, or
                disclosure.You have the right to delete your account at any
                time. You can do this from within the app settings or by
                contacting us directly.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                6. Children’s Privacy
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                Cinemax App is also intended for use by children. We do not
                knowingly collect personal information from children under the
                age of 13 without parental consent. If we become aware that we
                have collected personal data from a child without proper
                verification or consent, we will take steps to delete the
                information immediately.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                7. Changes to This Policy
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                We may update this Privacy Policy from time to time. Any changes
                will be communicated via the app or on this page.
              </Text>
            </View>

            <View style={tw.style('mb-4')}>
              <Text
                style={tw.style('text-white text-lg font-montserratSemiBold')}>
                8. Contact Us
              </Text>
              <Text style={tw.style('text-white text-base font-montserrat')}>
                If you have any questions or concerns regarding this Privacy
                Policy, feel free to contact us at: {'\n'}📧 Email:
                ruky.sektiawan@gmail.com
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
