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
  return (
    <div className="mb-8 flex justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="relative px-10">
          {/* Background Line */}
          <div className="absolute top-5 left-10 right-10 h-0.5 bg-gray-300"></div>
          
          {/* Progress Line */}
          <div 
            className="absolute top-5 left-10 h-0.5 bg-blue-500 transition-all duration-300"
            style={{ 
              width: `calc((100% - 80px) * ${(currentStep - 1) / (steps.length - 1)})` 
            }}
          ></div>

          {/* Steps */}
          <div className="relative flex justify-between items-start">
            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = stepNumber < currentStep

              return (
                <div key={step.id} className="flex flex-col items-center" style={{ flex: 1 }}>
                  {/* Step Circle */}
                  <div
                    className={`
                      relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                      transition-all duration-200
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
                  <div className="mt-2 text-center px-2">
                    <p
                      className={`
                        text-xs transition-colors duration-200 leading-tight whitespace-nowrap
                        ${
                          isActive
                            ? "text-blue-600 font-medium"
                            : isCompleted
                            ? "text-gray-700"
                            : "text-gray-400"
                        }
                      `}
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