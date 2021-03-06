#pragma once

#include "ai/primitive/primitive.h"

class StopPrimitive : public Primitive
{
   public:
    static const std::string PRIMITIVE_NAME;

    /**
     * Creates a new Stop Primitive
     *
     * Stops the robot with the option to coast to a stop rather than stop immediately
     *
     * @param robot_id The id of the Robot to run this Primitive
     * @param coast to coast to a stop or not
     */
    explicit StopPrimitive(unsigned int robot_id, bool coast);

    /**
     * Creates a new Stop Primitive from a Primitive message
     *
     * @param primitive_msg The message from which to create the Stop Primitive
     */
    explicit StopPrimitive(const thunderbots_msgs::Primitive &primitive_msg);

    std::string getPrimitiveName() const override;

    unsigned int getRobotId() const override;

    /**
     * Gets whether the robot should coast or not
     *
     * @return whether the robot should coast to a stop
     */
    bool robotShouldCoast() const;

    /**
     * This primitive has no parameters, @see getExtraBits()
     *
     * @return an empty vector
     */
    std::vector<double> getParameters() const override;

    /**
     * This primitive uses the extra_bit array as its parameter array
     *
     *
     * @return a vector that contains whether the robot should coast
     */
    std::vector<bool> getExtraBits() const override;

    void accept(PrimitiveVisitor &visitor) const override;

   private:
    unsigned int robot_id;

    // whether the robot should apply power to its wheels to stop
    // or should stop naturally, not applying power
    bool coast;
};
