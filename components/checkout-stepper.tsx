"use client"

interface Step {
  id: string
  title: string
  description?: string
}

interface CheckoutStepperProps {
  currentStep: number
  steps: Step[]
}

export function CheckoutStepper({ currentStep, steps }: CheckoutStepperProps) {
  // Tính toán progress line width: từ center circle 1 đến center circle hiện tại
  // Circle 1 center: 16.67%, Circle 2: 50%, Circle 3: 83.33%
  const getProgressWidth = () => {
    if (currentStep === 1) return '0%'
    if (currentStep === 2) return 'calc(50% - 16.67%)' // Từ circle 1 đến circle 2
    return 'calc(83.33% - 16.67%)' // Từ circle 1 đến circle 3
  }
  
  return (
    <div className="mb-6 sm:mb-7 md:mb-8 flex justify-center px-2 sm:px-4">
      <div className="w-full max-w-2xl">
        <div className="relative">
          {/* Background Line - từ center của circle 1 (16.67%) đến center của circle 3 (83.33%) */}
          <div className="absolute top-3 sm:top-4 md:top-5 left-[16.67%] right-[16.67%] h-0.5 bg-gray-300"></div>
          
          {/* Progress Line - từ center của circle 1 đến center của circle hiện tại */}
          <div 
            className="absolute top-3 sm:top-4 md:top-5 h-0.5 bg-blue-500 transition-all duration-300"
            style={{ 
              left: '16.67%',
              width: getProgressWidth()
            }}
          ></div>

          {/* Steps - Grid layout để căn đều */}
          <div className="relative grid grid-cols-3 items-start">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep

              return (
                <div key={step.id} className="flex flex-col items-center justify-start">
                  {/* Step Circle */}
                  <div
                    className={`
                      relative z-10 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs sm:text-xs md:text-sm font-medium
                      transition-all duration-200 mx-auto
                      ${
                        isCompleted
                          ? "bg-blue-500 text-white border-2 border-blue-500"
                          : isActive
                          ? "bg-blue-500 text-white border-2 border-blue-500"
                          : "bg-white text-gray-400 border-2 border-gray-300"
                      }
                    `}
                  >
                    {stepNumber}
                  </div>

                  {/* Step Label */}
                  <div className="mt-1 sm:mt-1.5 md:mt-2 text-center px-1 sm:px-2 w-full">
                    <p
                      className={`
                        text-[10px] sm:text-xs transition-colors duration-200 leading-tight mx-auto
                        ${
                          isActive
                            ? "text-blue-600 font-medium"
                            : isCompleted
                            ? "text-gray-700"
                            : "text-gray-400"
                        }
                      `}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {step.title}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}