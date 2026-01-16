const features = [
  {
    icon: '🧘',
    title: 'Core Training',
    description: 'With certified instructors and a passion for holistic wellness.',
  },
  {
    icon: '🥗',
    title: 'Nutrition Guidance',
    description: 'Receive personalized dietary advice tailored to your unique health goals.',
  },
  {
    icon: '⚖️',
    title: 'Weight Balance',
    description: 'Achieve optimal weight balance through personalized fitness plans.',
  },
  {
    icon: '🏋️',
    title: 'Posture Correction',
    description: 'Enhance your well-being with exercises designed to improve your posture.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center text-3xl mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="uppercase tracking-wide text-sm font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}